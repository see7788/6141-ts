import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import { reqIpcInit_t } from "@ui/type"
import type { } from 'zustand/middleware'//调试作用
import { config,State_t, on_t,macId_t } from "../cppUse/t"
// type req_t = (...op: Parameters<on_t> extends [infer versionId_t, ...infer Op]?Op:never) => Promise<void>
type req_t = (...op:  [...Exclude<Parameters<on_t>,void>]) => Promise<void>
// type ExpandRecursively<T> = T extends shuobject
//   ? T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never
//   : T;
// type demo=ExpandRecursively<qa_t>
interface state2_t extends  Partial<Omit<State_t,"i18n">>,Pick<State_t, "i18n">{

}
interface store_t {
    state: state2_t;
    res: (jsonstr: string) => void;
    reqInit: reqIpcInit_t,
    req: req_t;
}
// declare global {
//     interface Window {
//         req: (JSONstringify: string) => void;
//     }
// }
//window.req=()=>console.log("stroe def")
const useStore = create<store_t>()(immer<store_t>((seter, self) => {
    const defReq: req_t = async (...str) => console.log("defReq", ...str)
    return {
        state: {
            i18n: config["i18n"],
        },
        reqInit: req2 => {
            if (req2) {
                seter(s => {
                    s.req = async (...op) => {
                        if (op[0] === "config_set") {
                            seter(s => {
                                s.state = { ...s.state, ...op[1] }
                            })
                        }
                        const c = JSON.stringify(op)
                        console.log(c);
                        req2(c)
                    }
                    s.req("initGet",config.mcu_base[2]);
                })
            } else {
                seter(s => {
                    s.req = defReq
                })
            }
        },
        res: jsonstr => seter(s => {
            try {
                // Awaited<ReturnType<on_t>>
                const res = JSON.parse(jsonstr) as ReturnType<on_t>
                let use = false
                if (res) {
                    const [api, info] = res;
                    if (["initGet","config_set","mcu_state_publish"].includes(api)) {
                        s.state = { ...s.state, ...info }
                        use = true;
                    }else if(api==="mcu_ybldatas_publish"&&s.state?.mcu_ybl){
                        s.state.mcu_ybl[0]=info;
                        use = true;
                    }
                }
                console.log(use, res);
            } catch (e) {
                console.error(jsonstr)
            }
        }),
        req: defReq,
    }
}))
export default useStore