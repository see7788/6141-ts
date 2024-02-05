import aedes from "aedes"
import { createServer as listenMqttServer } from "aedes-server-factory"
import { mcu_ybl_idInfo_t, mcu_ybldatas_t, mcu_ybl_t } from "../dz002-cppWeb/protected/mcu_ybl/.t"
import { on_t as mcu_on_t, state_t as mcu_state_t } from "../dz002-cppTs/t"
type macAddress = string
type ybls_t = Record<macAddress, mcu_ybldatas_t>//string=mcu.address
interface mac_t {
    macAddress: macAddress,
}
type macs = Array<mac_t>
interface tokenParam { name: string, pass: string }
interface admin extends tokenParam {
}
type admins = Array<admin>

type state_t = {
    macs: macs;
    ybls: ybls_t;
    webAdmins: admins
}
export class StateServer {
    mqtt
    state: state_t = {
        macs: [],
        ybls: {},
        webAdmins: []
    }
    constructor() {
        this.mqtt = {
            publishIds: new Set(),
            wsPort: 2222,
            tcpPort: 33333,
            obj: new aedes()
        }
        this.initMqtt();
    }
    private initMqtt() {
        const obj = this.mqtt.obj;
        const publishIds = this.mqtt.publishIds
        //连接拦截
        obj.authenticate = function (client, username, password, callback) {
            console.log('server.mqtt.authenticate', username, password?.toString())
            callback(null, true)
        }
        // 断开事件
        obj.on('clientDisconnect', (client) => {
            publishIds.delete(client.id);
        })
        //发布拦截
        obj.authorizePublish = function (client, packet, callback) {
            console.log("server.mqtt.authorizePublish", packet?.topic, packet?.payload?.toString());
            //callback(new Error('=======authorizePublish========'));//拦截
            callback();//放行
        }
        // 使用 Websocket 协议
        listenMqttServer(this.mqtt.obj, { ws: true }).listen(this.mqtt.wsPort)
        // 使用 TCP 协议传输的
        listenMqttServer(this.mqtt.obj, { trustProxy: true }).listen(this.mqtt.tcpPort)
    }
    set_macs(c: macs): Pick<state_t, "macs"> {
        this.state.macs = c;
        return { macs: this.state.macs }
    }
    set_ybls(c: ybls_t): Pick<state_t, "ybls"> {
        const ks = Object.keys(c);
        const id: macAddress = ks[0]
        if (ks.length === 1 && this.inMacs(id)) {
            this.state.ybls[id] = c[id]
        }
        return { ybls: this.state.ybls }
    }
    inWebAdmin(c: tokenParam): boolean {
        const c2 = this.state.webAdmins.findIndex(v => v.name === c.name && v.pass === c.pass)
        return c2 !== -1
    }
    inMacs(c: macAddress): boolean {
        const c2 = this.state.macs.findIndex(v => v.macAddress === c)
        return c2 !== -1
    }
}
export default new StateServer()