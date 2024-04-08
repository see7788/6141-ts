import { Store_t as Store_t1 } from "../node/t"
import config from "../node/c"
import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import _ from "lodash"
type onParam_t = Parameters<Store_t1["admins"]["ws"]["sendToAll"]>
interface Store_t {
    state: onParam_t[1]
    send: Store_t1["admins"]["ws"]["onMessage"]
}

export default create<Store_t>()(immer<Store_t>((seter, self) => {
    const ws = new WebSocket(`ws://${config.admins.wsServer.host}:${config.admins.wsServer.port}?xxx=111`);
    ws.onopen = (e) => console.log("onopen", e);
    ws.onerror = (e) => console.log("onerror", e);
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
            console.log(use, e)
        } catch (e2) {
            console.error(e, e2)
        }
    }
    return {
        state: {
            dz002s: {},
        },
        send() { },
    }
}))