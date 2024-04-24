import { Store_t as Store_t1 } from "../t"
import config from "../../config"
import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import _ from "lodash"
type onParam_t = Parameters<Store_t1["admins"]["ws"]["sendToAll"]>
interface Store_t {
    state: onParam_t[1]
    send: Store_t1["admins"]["ws"]["onMessage"]
}    
const ws = new WebSocket(`${config.admins.server.wsuri}?aaaaaaaaa`);
export default create<Store_t>()(immer<Store_t>((seter, self) => {
    ws.onopen = (e) => {
        setInterval(() => {
            console.log("aaa setInterval")
            // ws.send(JSON.stringify(["from web"]))
        }, 3000)
    };
    ws.onclose = (e) => console.log("onclose", e);
    ws.onerror = (e) => console.log("onerror", e);
    ws.onmessage = e => {
        try {
            const [api, db] = JSON.parse(e.data) as onParam_t
            let use = false
            seter(s => {
                if ("dz002s_set" === api) {
                    use = true;
                    s.state.dz002s = db.dz002s;
                }
            })
            console.log("onmessage", use, e)
        } catch (e2) {
            console.error("onmessage", e, e2)
        }
    }
    return {
        state: {
            dz002s: {},
        },
        send() { },
    }
}))