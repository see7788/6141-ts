import { Store_t } from "../node/t"
import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import config from "../node/c"
type t2=Parameters<Store_t["visitor"]["ws"]["sendTo"]> extends [any,...infer U]?U:never
export type onParam_t = Parameters<Store_t["visitor"]["ws"]["sendToAll"]>|t2
type state_t = onParam_t[1]
export interface store_t {
    state: state_t;
}
export default create<store_t>()(immer<store_t>((seter, self) => {
    const ws = new WebSocket(`ws://${config.visitor.server.ws.host}:${config.visitor.server.ws.port}?xxx=111`);
    ws.onopen = e => console.log(e);
    ws.onmessage = e => {
        try {
            const [api, db] = JSON.parse(e.data) as onParam_t
            seter(e => {
                e.state = db
                console.log(api,db)
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