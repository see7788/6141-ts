import aedes, { PublishPacket } from "aedes"
import { createServer as listenMqttServer } from "aedes-server-factory"
import { PoolOptions, Pool, createPool } from 'mysql2/promise';
import { Store_t } from "./t"
import configBase from "./config"
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
class InitServer {
    dz002: Store_t["dz002"]
    admin: Store_t["admin"]
    user: Store_t["user"]
    wsCreate(port: keyof typeof configBase.dz002) {
        const obj = new WebSocketServer(
            {
                port: configBase.dz002[port]
            },
            () => { console.log(obj.address()) }
        );
        return obj
    }
    constructor() {
        this.dz002 = {
            wsClis: new Map(),
            wsServer: this.wsCreate("mcu_ws_port"),
            cache: {
                db: {},
                fun: {
                    dz002: {
                        ws: {
                            on: () => {
                                return ["dz002_cachePublish", this.dz002.cache.db]
                            },
                            login() {
                                return true
                            }
                        }
                    },
                    admin: {
                        ws: {
                            on: (...op) => {
                                return ["dz002_cachePublish", this.dz002.cache.db]
                            }
                        }
                    }
                }
            },
            wsFun: {
                send(...db) {

                },
                on() { },
            }
        }
        this.admin = {
            wsServer: this.wsCreate("webUser_ws_port"),
            wsClis: new Map(),
            cache: {
                db: [],
                fun: {
                    admin:{
                        ws:{
                            login: () => { },
                            on: () => {
                                return ["admin_cachePublish", this.admin.cache.db]
                            },
                        }
                    }
                }
            },
            wsFun: {
                on() {
                    // if (op[0] === "mcu_ybl_publish" && op[2] && this.state.dz002mcus.info?.[op[2]]) {
                    //     //this.webUser_ws.publish(this.state.dz002mcus.info?.[op[2]);
                    //     //admin_ws.publish(this.info);
                    // }
                },
                send(...db) {

                }
            },

        }
        this.user = {
            wsServer: this.wsCreate("webUser_ws_port"),
            wsFun: {
                send: (...db) => {
                    this.user.wsServer.clients.forEach((cli) => {
                        if (cli.readyState === WebSocket.OPEN) {
                            cli.send(JSON.stringify(db), { binary: false });
                        }
                    })
                }
            }
        }
        this.wsOnStart();
    }
    wsOnStart() {
        this.dz002.wsServer.on('connection', (cli, req) => {
            console.log(cli.url, req.url)
            cli.onerror = (e) => console.log('ws onerror %s', e)
            cli.on("message", message => {
                const str = message.toString();
                const msg = JSON.parse(str)
                cli.send("非法访问")
            })
        })
        this.admin.wsServer.on('connection', (cli, req) => {
            cli.onerror = (e) => console.log('ws onerror %s', e)
            cli.on("message", message => {
                const str = message.toString();
                const msg = JSON.parse(str)
                cli.send("非法访问")
            })
        })
        this.user.wsServer.on('connection', (cli, req) => {
            cli.onerror = (e) => console.log('ws onerror %s', e)
            cli.on("message", message => {
                const str = message.toString();
                const msg = JSON.parse(str)
                cli.send("非法访问")
            })
        })
    }
}

new InitServer()