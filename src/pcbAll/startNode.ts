import aedes, { PublishPacket } from "aedes"
import { createServer as listenMqttServer } from "aedes-server-factory"
import { PoolOptions, Pool, createPool } from 'mysql2/promise';
import _ from "lodash"
import { Store_t } from "./t"
import config from "../config"
import WsClient, { WebSocketServer, WebSocket } from "ws"//文档中的客户端是 引用 WebSocket 中具有客户端角色的后端 通信。浏览器客户端必须使用本机 WebSocket 对象。要使相同的代码在 Node.js 和浏览器上无缝运行，您需要 可以使用 npm 上可用的许多包装器之一，例如 isomorphic-ws。
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
    private pcbDz002s
    private admins
    private visitor
    constructor() {
        this.pcbDz002s = this.pcbDz002sInit();
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
    private wsCreate(sname: keyof Pick<Store_t, "pcbDz002s" | "admins" | "visitor">): WsClient.Server {
        const c = config[sname].server
        const port = Number(c.wsuri.split(":")[2])
        const s = new WebSocketServer(
            {
                port
            },
            () => {
                console.log(`${sname}.ws.port ${port} ${c.name} start success`)
            }
        );
        return s
    }
    private pcbDz002sInit() {
        const configc: Store_t["pcbDz002s"] = {
            db: {},
            dbOn: (...op) => {
                const id = op[0]
                if (!configc.db[id]) {
                    configc.db[id] = {
                        mcuConfig: {},
                        yblConfig: {},
                        yblState: {},
                    }
                }
                switch (op[1]) {
                    case "dz002_set":
                        configc.db[id] = op[2];
                        break;
                    case "dz002s_yblState_publish":
                        configc.db[id].yblState = op[2];
                        break;
                    case "dz002s_yblConfig_set":
                        configc.db[id].yblConfig = op[2];
                        break;
                    case "dz002s_mcuConfig_set":
                        configc.db[id].mcuConfig = op[2];
                        break;
                    // case "dz002s_wsconnection_set":
                    //     configc.db[id].wsOnLine = op[2];
                    //     break;
                    // case "dz002s_wsclose_set":
                    //     delete configc.db[id].wsOnLine;
                    //     break;
                    default:
                }
                //console.log(configc.db)
                this.admins.ws.sendToAll("dz002s_set", { dz002s: configc.db })
                this.visitor.ws.sendToAll("dz002s_set", { dz002s: configc.db })
                return ["dz002s_set", { dz002s: configc.db }];
            },
            ws: {
                onMessage: (mac, api, ...op) => {
                    if (api === "dz002s_yblState_publish") {
                        configc.dbOn(mac, api, ...op)
                    } else {
                        console.log("pass", api)
                    }
                },
            }
        }
        this.wsCreate("pcbDz002s").on('connection', (cli, req) => {
            const macId = req.url?.substring(1) || "";
            console.log(macId)
            configc.dbOn(macId, "dz002s_wsconnection_set", cli);
            cli.onerror = (e) => console.log('ws onerror %s', e)
            cli.onopen = () => {
                console.log("onopen")
            }
            cli.on("close", e => {
                configc.dbOn(macId, "dz002s_wsclose_set");
            })
            cli.on("message", message => {
                const str = message.toString();
                try {
                    const c = JSON.parse(str)
                    const res = [macId, ...c] as Parameters<Store_t["pcbDz002s"]["ws"]["onMessage"]>;
                    configc.ws.onMessage(...res);
                    //console.log("111111")
                } catch (e) {
                    console.log("e", e, str)
                }
            })
        })
        return configc
    }
    private adminsInit() {
        const server = this.wsCreate("admins")
        const configc: Store_t["admins"] = {
            ws: {
                onMessage: (...op) => {
                    if (["dz002s_yblConfig_set", "dz002s_mcuConfig_set", "dz002s_set"].includes(op[1])) {
                        this.pcbDz002s.dbOn(...op)
                    }
                },
                sendTo: this.wsSendTo,
                sendToAll: (...op) => server.clients.forEach(cli => this.wsSendTo(cli, ...op))
            }
        }
        server.on('connection', (cli, req) => {
            const macId = req.url?.substring(1) || "";
            console.log(macId)
            // configc.ws.sendTo(cli,"dz002s_set", { dz002s: this.pcbDz002s.db })
            cli.send(JSON.stringify([111111]), err => console.log("send cb", err))
            //cli.send(123,cb=>console.log("send cb",cb))
            cli.onerror = (e) => console.log('ws onerror %s', e)
            cli.on("message", message => {
                try {
                    const str = message.toString();
                    const res = JSON.parse(str) as Parameters<Store_t["admins"]["ws"]["onMessage"]>;
                    configc.ws.onMessage(...res);
                } catch (e) {
                    console.log("json error")
                }
            })
        })
        return configc
    }
    private visitorInit() {
        const server = this.wsCreate("visitor")
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