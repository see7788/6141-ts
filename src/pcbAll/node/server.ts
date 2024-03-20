import aedes, { PublishPacket } from "aedes"
import { createServer as listenMqttServer } from "aedes-server-factory"
import { PoolOptions, Pool, createPool } from 'mysql2/promise';
import { Store_t } from "./t"
import config from "./c"
import WsClient, { WebSocketServer, WebSocket } from "ws"//文档中的客户端是 引用 WebSocket 中具有客户端角色的后端 通信。浏览器客户端必须使用本机 WebSocket 对象。要使相同的代码在 Node.js 和浏览器上无缝运行，您需要 可以使用 npm 上可用的许多包装器之一，例如 isomorphic-ws。
import { has } from "lodash";
import cp from "child_process"
import e from "express";
// https://tunnelmole.com/  内网穿透
// https://dujun.io/tunnelmole-example.html
// import { tunnelmole } from 'tunnelmole';
// async function init(){
//    return await tunnelmole({
//         port: 6227
//     });
// }
// init().then(console.log)
// const wss = new WebSocketServer({ port: appConfig.admin_ws_port }, () => {
//     console.log("应用实例，访问地址为 http://%s:", wss.address())
// });
// wss.on('connection', function (ws, request) {
//     ws.on("open", console.log)
//     ws.on('error', console.error);
//     ws.on('message', function (message) {
//         console.log(`Received message ${message} `);
//     });
// });
type onConnectionIng_t = (ersId: string, connectionIng: boolean) => void
type config_t = typeof config
class nodeServer {
    state: Store_t["state"]
    get stateApi(): Store_t["stateApi"] {
        const { dz002s, ers } = this.state
        return {
            dz002s: ["state_set", { dz002s }],
            ers: ["state_set", { ers }],
            all: ["state_set", this.state],
            dz002s_connectionIng: (erId, c) => {
                if (c) {
                    if (this.state.ers[erId]) { }
                } else {

                }
            },
            admins_connectionIng: (erId, c) => {
                console.log(c)
            },
            visitor_connectionIng: (erId, c) => {
                console.log(c)
            },
            mcu_ybldatas_publish: (_, yblstate, macId) => {
                if (this.state.dz002s[macId]) {
                    this.state.dz002s[macId].yblsstate = yblstate;
                    const c2 = this.stateApi.all;
                    this.visitor.ws.sendToAll(...c2);
                    this.admins.ws.sendToAll(...c2);
                    return c2
                }
            },
            yblsconfig_set: (_, yblsconfig, macId) => {
                if (this.state.dz002s[macId]) {
                    this.state.dz002s[macId].yblsconfig = yblsconfig;
                    const c2 = ["state_set", { dz002s: { [macId]: this.state.dz002s[macId] } }] as const
                    this.visitor.ws.sendToAll(...c2);
                    this.admins.ws.sendToAll(...c2);
                    return c2
                }
            }
        }
    }
    dz002s
    admins
    visitor
    constructor() {
        this.state = {
            dz002s: {
                xxxxxxx: {
                    id: "xxxxxxx",
                    yblsstate: {},
                    yblsconfig: {}

                },
            },
            ers: {},
        };
        this.dz002s = this.dz002sInit();
        this.admins = this.adminsInit();
        this.visitor = this.visitorInit();
        cp.exec(` pnpm dev --mode pcbAll/visitorWeb --port ${config.visitor.web.port}`, console.log);
    }
    private wsCreate(
        name: keyof Pick<config_t, "dz002s" | "admins" | "visitor">,
        onConnectionIng: onConnectionIng_t,
        onMessage: (...op: Array<any>) => void
    ) {
        const obj = new WebSocketServer(
            {
                port: config[name].server.ws.port
            },
            () => { console.log([name, obj.address()]) }
        );
        obj.on('connection', (cli, req) => {
            const ersId = req.url?.substring(1) || "";
            onConnectionIng(ersId, true);
            cli.onerror = (e) => console.log('ws onerror %s', e)
            cli.on("close", _ => onConnectionIng(ersId, false))
            cli.on("message", message => {
                try {
                    const str = message.toString();
                    const c = JSON.parse(str) as Parameters<Store_t["dz002s"]["ws"]["onMessage"]>;
                    onMessage(c)
                } catch (e) {
                    this.wsSendTo(ersId, "json error")
                }
            })
        })
        return obj
    }
    private wsSendTo(to: WsClient | string | undefined, ...apiData: Array<any>) {
        if (typeof to === "string") {
            to = this.state.ers[to]?.wsCli//返回类型WsClient | undefined
        }
        if (!to) {
            console.log("!to")
        } else if (to.readyState !== WebSocket.OPEN) {
            to.send("to.readyState !== WebSocket.OPEN");
        } else {
            to.send(JSON.stringify(apiData));
        }
    }
    dz002sInit() {
        const onMessage: Store_t["dz002s"]["ws"]["onMessage"] = (...op) => {

        }
        const server = this.wsCreate("dz002s", this.stateApi.dz002s_connectionIng, onMessage)
        const ws: Store_t["dz002s"]["ws"] = {
            // sendToAll: (...op) => server.clients.forEach(cli => this.wsSendTo(cli, ...op)),
            sendTo: this.wsSendTo,
            onMessage
        }
        return { ws }
    }
    adminsInit() {
        const onMessage: Store_t["admins"]["ws"]["onMessage"] = (...op) => {

        }
        const server = this.wsCreate("admins", this.stateApi.admins_connectionIng, onMessage)
        const ws: Pick<Store_t["admins"]["ws"], "sendToAll" | "sendTo"> = {
            sendToAll: (...op) => server.clients.forEach(cli => this.wsSendTo(cli, ...op)),
            sendTo: this.wsSendTo,
        }
        return { ws };
    }
    visitorInit() {
        const server = this.wsCreate("visitor", this.stateApi.visitor_connectionIng, (...op) => console.log("onMessage false", ...op))
        const ws: Pick<Store_t["visitor"]["ws"], "sendTo" | "sendToAll"> = {
            sendTo: this.wsSendTo,
            sendToAll: (...op) => server.clients.forEach(cli => this.wsSendTo(cli, ...op))
        }
        return { ws };
    }
}

new nodeServer()