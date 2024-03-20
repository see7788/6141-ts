import { Store_t as Store_t1, State_t as State_t1 } from "../node/t"
import { State_t as State_t2 ,config} from "../../pcbDz002/cppUse/t"
import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
type onParam_t = Parameters<Store_t1["admins"]["ws"]["sendToAll"]>
interface State_t extends State_t1, Partial<Omit<State_t2,"i18n">>,Pick<State_t2, "i18n"> { }
interface Store_t {
    state: State_t
    send: Store_t1["admins"]["ws"]["onMessage"]
}

export default create<Store_t>()(immer<Store_t>((seter, self) => {
    const ws = new WebSocket("");
    ws.onopen = e => console.log(e);
    ws.onmessage = e => {
        seter(s => {
            try {
                // Awaited<ReturnType<on_t>>
                const res = JSON.parse(e.data) as onParam_t
                let use = false
                if (res) {
                    const [api, info] = res;
                    if (["initGet","config_set","mcu_state_publish"].includes(api)) {
                        s.state = { ...s.state, ...info }
                        use = true;
                    }
                }
                console.log(use, res);
            } catch (e2) {
                console.error(e,e2)
            }
        })
    }
    return {
        state: {
            i18n:config["i18n"],
            dz002s: {},
            ers:{}
        },
        send(){},
    }
}))