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
    dz002s: Store_t["dz002s"]
    admins: Store_t["admins"]
    users: Store_t["users"]
    wsCreate(name: keyof Pick<configBase_t, "dz002s" | "admins" | "users">) {
        const obj = new WebSocketServer(
            {
                port: configBase.config[name].server.ws.port
            },
            () => { console.log([name, obj.address()]) }
        );
        return obj
    }
    cacheInit() { }
    constructor() {
        this.dz002s = {
            data: {
                cache: {},
                sql: {
                    initCacheDb: () => { },
                    setCacheDb: (op) => { }
                },
                dz002s: {
                    ws: {
                        server: this.wsCreate("dz002s"),
                        clis: new Map(),
                        on: () => {
                            return ["dz002s_publish", this.dz002s.data.cache]
                        },
                        login() {
                            return true
                        }
                    }
                },
                admins: {
                    ws: {
                        on: (...op) => {
                            return ["dz002s_publish", this.dz002s.data.cache]
                        }
                    }
                }
            },
            ws: {
                send(...db) {

                },
                on() { },
            }

        }
        this.admins = {
            data: {
                cache: [],
                sql: {
                    initCacheDb: () => { },
                    setCacheDb: (op) => { }
                },
                admins: {
                    ws: {
                        server: this.wsCreate("admins"),
                        clis: new Map(),
                        login: () => { },
                        on: () => {
                            return ["admins_publish", this.admins.data.cache]
                        },
                    }
                }
            },
            ws: {
                on() {
                    // if (op[0] === "mcu_ybl_publish" && op[2] && this.state.dz002mcus.info?.[op[2]]) {
                    //     //this.webUser_ws.publish(this.state.dz002mcus.info?.[op[2]);
                    //     //admin_ws.publish(this.info);
                    // }
                },
                send(...db) {

                }
            }
        }
        this.users = {
            data: {
                users: {
                    ws: {
                        server: this.wsCreate("users"),
                    }
                }

            },
            ws: {
                send: (...db) => {
                    this.users.data.users.ws.server.clients.forEach((cli) => {
                        if (cli.readyState === WebSocket.OPEN) {
                            cli.send(JSON.stringify(db), { binary: false });
                        }
                    })
                }
            }
        }
        this.cacheInit();
        this.dz002_connection();
        this.admin_connection();
        this.user_connection();
    }
    dz002_connection() {
        this.dz002s.data.dz002s.ws.server.on('connection', (cli, req) => {
            console.log(cli.url, req.url)
            cli.onerror = (e) => console.log('ws onerror %s', e)
            cli.on("message", message => {
                try {
                    const str = message.toString();
                    const msg = JSON.parse(str) as Parameters<Store_t["dz002s"]["ws"]["on"]>
                    cli.send("非法访问")
                } catch (e) {
                    cli.send("非法访问")
                }
            })
        })
    }
    admin_connection() {
        this.admins.data.admins.ws.server.on('connection', (cli, req) => {

            cli.onerror = (e) => console.log('ws onerror %s', e)
            cli.on("message", message => {
                try {
                    const str = message.toString();
                    const msg = JSON.parse(str) as Parameters<Store_t["admins"]["ws"]["on"]>
                    cli.send("非法访问")
                } catch (e) {
                    cli.send("非法访问")
                }
            })
        })
    }
    user_connection() {
        this.users.data.users.ws.server.on('connection', (cli, req) => {
            cli.onerror = (e) => console.log('ws onerror %s', e)
            // cli.on("message", message => {
            //     try{
            //         const str = message.toString();
            //         const msg = JSON.parse(str) as Parameters<Store_t["user"]["ws"]["fun"]["on"]>
            //         cli.send("非法访问")
            //     }catch(e){
            //         cli.send("非法访问")
            //     }
            // })
        })
    }
}

new nodeServer()