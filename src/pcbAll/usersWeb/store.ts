import { Store_t } from "../t"
import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
export type onParam_t = Parameters<Store_t["users"]["ws"]["sendToAll"]>
type state_t = onParam_t[1]
export interface store_t {
    state: state_t;
}
export default create<store_t>()(immer<store_t>((seter, self) => {
    const ws = new WebSocket("");
    ws.onopen = e => console.log(e);
    ws.onmessage = e => {
        try {
            const [api, db] = JSON.parse(e.data) as onParam_t
            seter(e => {
                e.state = db
                console.log(e)
            })
        } catch (e) {

        }
    }
    return {
        state: {
            dz002s: {}
        },
    }
}))