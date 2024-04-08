import { Store_t } from "../node/t"
import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import config from "../node/c"
type onParam_t = Parameters<Store_t["visitor"]["ws"]["sendToAll"]>
export interface store_t {
    state: onParam_t[1];
}
export default create<store_t>()(immer<store_t>((seter, self) => {
    const ws = new WebSocket(`ws://${config.visitor.wsServer.host}:${config.visitor.wsServer.port}?xxx=111`);
    ws.onopen = (e)=>console.log("onopen",e);
    ws.onerror = (e)=>console.log("onerror",e);
    ws.onmessage = e => {
        try {
            const [api, db] = JSON.parse(e.data) as onParam_t
            let use = false
            seter(s => {
                if ("dz002s_set" === api) {
                    use =true;
                    s.state.dz002s = db.dz002s;
                }
            })
            console.log(use,e)
        } catch (e2) {
            console.error(e, e2)
        }
    }
    return {
        state: {
            dz002s: {}
        },
    }
}))