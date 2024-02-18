import aedes, { PublishPacket } from "aedes"
import { createServer as listenMqttServer } from "aedes-server-factory"
import { PoolOptions, Pool, createPool } from 'mysql2/promise';
import { id_mcu_t, config_t, appConfig, mcu_t, admin_t, mcu_on_t, id_admin_t } from "./t"
import WsClient, { WebSocketServer, WebSocket } from "ws"//文档中的客户端是 引用 WebSocket 中具有客户端角色的后端 通信。浏览器客户端必须使用本机 WebSocket 对象。要使相同的代码在 Node.js 和浏览器上无缝运行，您需要 可以使用 npm 上可用的许多包装器之一，例如 isomorphic-ws。
import { has } from "lodash";
//https://tunnelmole.com/  内网穿透
// https://dujun.io/tunnelmole-example.html
// import { tunnelmole } from 'tunnelmole';
// async function init(){
//    return await tunnelmole({
//         port: 6227
//     });
// }
// init().then(console.log)
// const wss = new WebSocketServer({ port: appConfig.webAdmin_ws_port }, () => {
//     console.log("应用实例，访问地址为 http://%s:", wss.address())
// });
// wss.on('connection', function (ws, request) {
//     ws.on("open", console.log)
//     ws.on('error', console.error);
//     ws.on('message', function (message) {
//         console.log(`Received message ${message} `);
//     });
// });
export default class {
    dataApi
    mcus_ws
    admin_ws
    user_ws
    constructor() {
        this.dataApi = this.dataApiInit();
        this.mcus_ws = this.mcus_wsInit();
        this.admin_ws = this.admins_wsInit();
        this.user_ws = this.webUser_wsInit();
    }
    private mysqlInit() {

    }
    private dataApiInit() {
        const data: config_t = { mcus: [], ybls: [], webAdmins: [] };
        const sql = createPool({
            ...appConfig.mysql,
            connectionLimit: 10, // 连接池中允许的最大连接数，默认为 10
        });
        return {
            mcus: {
                has(c?: id_mcu_t) {
                    return data.mcus.findIndex(v => v.id === c) !== -1
                },
                onLine: new Map<id_mcu_t, WsClient>()

            },
            admins: {
                has(c?: id_admin_t) {
                    return data.webAdmins.findIndex(v => v.id === c) !== -1
                },
                onLine: new Map<id_admin_t, WsClient>()
            }
        }
    }

    private mcus_wsInit() {
        const send = (id: id_mcu_t, ...db: Parameters<mcu_on_t>) => {
            const cli = this.dataApi.mcus.onLine.get(id);
            if (cli) {
                cli.send(JSON.stringify(db));
            }
        }
        const wsobj = new WebSocketServer({ port: appConfig.cppServer_ws_port }, () => {
            console.log("cppServer_ws %s:", wsobj.address())
        })
        wsobj.on('connection', (c, req) => {
            const id = req.url?.substring(1) || ""
            if (id && this.dataApi.mcus.has(id)) {
                if (this.dataApi.mcus.onLine.has(id)) {
                    this.dataApi.mcus.onLine.get(id)?.close();
                }
                this.dataApi.mcus.onLine.set(id, c)
            }
            this.admin_ws.sendALL("mcusOnLine_set")
            this.user_ws.sendALL("mcusOnLine_set")
            c.on("close", e => {
                this.dataApi.mcus.onLine.delete(id)
                this.admin_ws.sendALL("mcusOnLine_set")
                this.user_ws.sendALL("mcusOnLine_set")
            })
            c.on("message", message => {
                const str = message.toString();
                const obj = JSON.parse(str)
                console.log("cppServer_ws on", obj);
            })
        });
        return send;
    }
    private admins_wsInit() {
        const wsobj = new WebSocketServer({ port: appConfig.cppServer_ws_port })
        function sendALL(db: "mcusData_set" | "yblsData_set" |"adminsData_set" | "adminsOnLine_set" | "mcusOnLine_set") {
            wsobj.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(db), { binary: false });
                }
            })
        }
        const send = (id: id_admin_t, ...db: Parameters<mcu_on_t>) => {
            const cli = this.dataApi.admins.onLine.get(id);
            if (cli) {
                cli.send(JSON.stringify(db));
            }
        }
        wsobj.on('connection', (c, req) => {
            const id = Number(req.url?.substring(1) || "")
            if (id && this.dataApi.admins.has(id)) {
                if (this.dataApi.admins.onLine.has(id)) {
                    this.dataApi.admins.onLine.get(id)?.close();
                }
                this.dataApi.admins.onLine.set(id, c)
            }
            this.admin_ws.sendALL("adminsOnLine_set")
            c.on("close", e => {
                this.dataApi.admins.onLine.delete(id)
                this.admin_ws.sendALL("adminsOnLine_set")
            })
            c.on("message", message => {
                const str = message.toString();
                const obj = JSON.parse(str)
                console.log("webAdmin_ws", obj);
            })
        });
        return { send, sendALL }
    }
    private webUser_wsInit() {
        const wsobj = new WebSocketServer({ port: appConfig.cppServer_ws_port })
        function sendALL(db: "mcusData_set" | "yblsData_set" | "adminsOnLine_set" | "mcusOnLine_set") {
            wsobj.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(db), { binary: false });
                }
            })
        }
        wsobj.on('connection', (c, req) => {
            c.onerror = (e) => console.log('ws onerror %s', e)
            c.on("message", message => {
                const str = message.toString();
                const obj = JSON.parse(str)
                c.send("非法访问")
            })
        });
        return { sendALL }
    }
}