import { Store_t } from "../t"
import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import config from "../../config"
type onParam_t = Parameters<Store_t["visitor"]["ws"]["sendToAll"]>
export interface store_t {
    state: onParam_t[1];
}
const ws = new WebSocket(`${config.visitor.server.wsuri}?vvvvvv`);
export default create<store_t>()(immer<store_t>((seter, self) => {
    ws.onopen = (e) => {
        setInterval(() => {
             console.log("vvvv setInterval")
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
            dz002s: {}
        },
    }
}))