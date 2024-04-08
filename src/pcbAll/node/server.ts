import aedes, { PublishPacket } from "aedes"
import { createServer as listenMqttServer } from "aedes-server-factory"
import { PoolOptions, Pool, createPool } from 'mysql2/promise';
import _ from "lodash"
import { Store_t } from "./t"
import config from "./c"
import WsClient, { WebSocketServer, WebSocket } from "ws"//文档中的客户端是 引用 WebSocket 中具有客户端角色的后端 通信。浏览器客户端必须使用本机 WebSocket 对象。要使相同的代码在 Node.js 和浏览器上无缝运行，您需要 可以使用 npm 上可用的许多包装器之一，例如 isomorphic-ws。
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
class nodeServer {
    private dz002s
    private admins
    private visitor
    constructor() {
        this.dz002s = this.dz002sInit();
        this.admins = this.adminsInit();
        this.visitor = this.visitorInit();
    }
    private wsSendTo(cli: WsClient | undefined, ...apiData: Array<any>) {
        if (!cli) {
            console.log("!erId")
        } else if (cli.readyState !== WebSocket.OPEN) {
            cli.send("to.readyState !== WebSocket.OPEN");
        } else {
            cli.send(JSON.stringify(apiData));
        }
    }
    private wsCreate(sname: keyof Pick<Store_t, "dz002s" | "admins" | "visitor">): WsClient.Server {
        const port = config[sname].wsServer.port
        const s = new WebSocketServer(
            {
                port
            },
            () => {
                console.log(`${sname}.ws.port ${port} ${config[sname].wsServer.name} start success`)
            }
        );
        return s
    }
    private webCreate(sname: keyof Pick<Store_t, "dz002s" | "admins" | "visitor">) {
        const port = config[sname].web.port
        const cmd = ` pnpm dev --mode pcbAll/${sname}Web --port ${port}`
        cp.exec(cmd)
            .stdout
            ?.once('data', e => console.log(`${sname}.web.port ${port} ${config[sname].web.name} start success`))
    }
    private dz002sInit() {
        const configc: Store_t["dz002s"] = {
            db: {},
            dbOn(...op) {
                switch (op[1]) {
                    case "dz002s_yblState_publish":
                        this.db[op[0]].yblState=op[2];
                        break;
                    case "dz002s_yblConfig_set":
                        this.db[op[0]].yblConfig=op[2];
                        break;
                    default:
                }
                return ["dz002s_set", { dz002s: this.db }];
            },
            ws: {
                onMessage: (mac, api, ...op) => {
                    if (api === "dz002s_yblState_publish") {
                        const c = configc.dbOn(mac, api, ...op)
                        this.admins.ws.sendToAll(...c)
                        this.visitor.ws.sendToAll(...c)
                    }
                },
            }
        }
        this.wsCreate("dz002s").on('connection', (cli, req) => {
            const erId = req.url?.substring(1) || "";
            cli.onerror = (e) => console.log('ws onerror %s', e)
            cli.on("message", message => {
                try {
                    const str = message.toString();
                    const c = JSON.parse(str)
                    const res = [erId, ...c] as Parameters<Store_t["dz002s"]["ws"]["onMessage"]>;
                    configc.ws.onMessage(...res);
                } catch (e) {
                    this.wsSendTo(cli, "json error")
                }
            })
        })
        return configc
    }
    private adminsInit() {
        const server = this.wsCreate("admins")
        this.webCreate("admins")
        const configc: Store_t["admins"] = {
            ws: {
                onMessage: (...op) => {
                    if (["dz002s_yblConfig_set", "dz002s_mcuConfig_set", "dz002s_set"].includes(op[1])) {
                        this.dz002s.dbOn(...op)
                    }
                },
                sendTo: this.wsSendTo,
                sendToAll: (...op) => server.clients.forEach(cli => this.wsSendTo(cli, ...op))
            }
        }
        server.on('connection', (cli, req) => {
            cli.onerror = (e) => console.log('ws onerror %s', e)
            cli.on("message", message => {
                try {
                    const str = message.toString();
                    const res = JSON.parse(str) as Parameters<Store_t["admins"]["ws"]["onMessage"]>;
                    configc.ws.onMessage(...res);
                } catch (e) {
                    this.wsSendTo(cli, "json error")
                }
            })
        })
        return configc
    }
    private visitorInit() {
        const server = this.wsCreate("visitor")
        this.webCreate("visitor")
        const configc: Store_t["visitor"] = {
            ws: {
                sendTo: this.wsSendTo,
                sendToAll: (...op) => server.clients.forEach(cli => this.wsSendTo(cli, ...op))
            }
        }
        server.on('connection', (cli, req) => {
            cli.onerror = (e) => console.log('ws onerror %s', e)
        })
        return configc
    }
}

new nodeServer()