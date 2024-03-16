import aedes, { PublishPacket } from "aedes"
import { createServer as listenMqttServer } from "aedes-server-factory"
import { PoolOptions, Pool, createPool } from 'mysql2/promise';
import { Store_t } from "./t"
import configBase from "../../package.json"
import WsClient, { WebSocketServer, WebSocket } from "ws"//文档中的客户端是 引用 WebSocket 中具有客户端角色的后端 通信。浏览器客户端必须使用本机 WebSocket 对象。要使相同的代码在 Node.js 和浏览器上无缝运行，您需要 可以使用 npm 上可用的许多包装器之一，例如 isomorphic-ws。
import { has } from "lodash";
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
type configBase_t = typeof configBase["config"]
class nodeServer {
    cache
    on
    dz002s
    admins
    users
    constructor() {
        this.cache = this.cacheInit();
        this.on = this.onInit();
        this.dz002s = this.dz002sInit();
        this.admins = this.adminsInit();
        this.users = this.usersInit();
    }
    wsCreate(name: keyof Pick<configBase_t, "dz002s" | "admins" | "users">) {
        const obj = new WebSocketServer(
            {
                port: configBase.config[name].server.ws.port
            },
            () => { console.log([name, obj.address()]) }
        );
        return obj
    }
    cacheInit() {
        const cache: Store_t["cache"] = {
            dz002s: {},
            admins: {},
        }
        return cache
    }
    onInit() {
        const on: Store_t["on"] = {
            dz002s_connectionIng: (macId, c) => { },
            admins_connectionIng: (userId, c) => { },
            mcu_ybldatas_publish: (_, yblstate, macId) => {
                if (this.cache.dz002s[macId]) {
                    this.cache.dz002s[macId].yblstate = yblstate;
                    const c2 = ["cache_set", { dz002s: { [macId]: this.cache.dz002s[macId] } }] as const
                    this.users.sendToAll(...c2);
                    this.admins.sendToAll(...c2);
                    return c2 as any
                }
            },
            yblsconfig_set: (_, yblsconfig, macId) => {
                if (this.cache.dz002s[macId]) {
                    this.cache.dz002s[macId].yblsconfig = yblsconfig;
                    const c2 = ["cache_set", { dz002s: { [macId]: this.cache.dz002s[macId] } }] as const
                    this.users.sendToAll(...c2);
                    this.admins.sendToAll(...c2);
                    return c2 as any
                }
            }
        }
        return on;
    }
    dz002sInit() {
        const c: Store_t["dz002s"]["ws"] = {
            server: this.wsCreate("dz002s"),
            clis: new Map(),
            // sendTo(macid, ...op) {
            //     const cli = c.clis.get(macid);
            //     if (cli && cli.readyState === WebSocket.OPEN) {
            //         cli.send(JSON.stringify(op), { binary: false });
            //     }
            // },
            onMessage(...op) {

            }
        }
        c.server.on('connection', (cli, req) => {
            const macid = cli.url
            console.log(cli.url, req.url)
            cli.onerror = (e) => console.log('ws onerror %s', e)
            if (this.on.dz002s_connectionIng(macid)) {
                c.clis.set(macid, cli);
            }
            cli.on("close", e => {
                if (this.on.dz002s_connectionIng(macid)) {
                    c.clis.delete(macid);
                }
            })
            cli.on("message", message => {
                try {
                    const str = message.toString();
                    const msg = JSON.parse(str) as Parameters<Store_t["dz002s"]["ws"]["onMessage"]>
                    if (msg[0] === "mcu_ybldatas_publish") {
                        this.on.mcu_ybldatas_publish(...msg);
                    }
                } catch (e) {
                    cli.send(["json error"])
                }
            })
        })
        return c
    }
    adminsInit() {
        const c: Store_t["admins"]["ws"] = {
            server: this.wsCreate("admins"),
            clis: new Map(),
            sendToAll(...op) {
                c.server.clients.forEach(cli => {
                    if (cli && cli.readyState === WebSocket.OPEN) {
                        cli.send(JSON.stringify(op), { binary: false });
                    }
                })
            },
            onMessage(...op) {

            }
        }
        c.server.on('connection', (cli, req) => {
            const macid = cli.url
            console.log(cli.url, req.url)
            cli.onerror = (e) => console.log('ws onerror %s', e)
            if (this.on.dz002s_connectionIng(macid)) {
                c.clis.set(macid, cli);
            }
            cli.on("close", e => {
                if (this.on.dz002s_connectionIng(macid)) {
                    c.clis.delete(macid);
                }
            })
            cli.on("message", message => {
                try {
                    const str = message.toString();
                    const msg = JSON.parse(str) as Parameters<Store_t["admins"]["ws"]["onMessage"]>
                    // if (msg[0] === "mcu_ybldatas_publish") {
                    //     // this.cache.mcu_ybldatas_publish(...msg);
                    // } else {
                    //     //c.send.
                    // }
                } catch (e) {
                    cli.send(["json error"])
                }
            })
        })
        return c;
    }
    usersInit() {
        const c: Store_t["users"]["ws"] = {
            server: this.wsCreate("users"),
            sendToAll(...op) {
                this.server.clients.forEach(cli => {
                    if (cli && cli.readyState === WebSocket.OPEN) {
                        cli.send(JSON.stringify(op), { binary: false });
                    }
                })
            }
        }
        c.server.on('connection', (cli, req) => {
            const macid = cli.url
            console.log(cli.url, req.url)
            cli.onerror = (e) => console.log('ws onerror %s', e)
            cli.on("message", message => {
                try {
                    const str = message.toString();
                    console.log(str);
                } catch (e) {
                    cli.send(["json error"])
                }
            })
        })
        return c;
    }
}

new nodeServer()