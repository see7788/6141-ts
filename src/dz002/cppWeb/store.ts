import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import { reqIpcInit_t } from "@ui/type"
import type { } from 'zustand/middleware'//调试作用
import { config,versionId, state_t, on_t } from "../cppUse/t"
type req_t = (...op: Parameters<on_t> extends [infer versionId_t, ...infer Op]?Op:never) => Promise<void>
// type ExpandRecursively<T> = T extends shuobject
//   ? T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never
//   : T;
// type demo=ExpandRecursively<qa_t>
interface state2_t extends  Partial<Omit<state_t,"i18n"|"mcu_base">>,Pick<state_t, "i18n"|"mcu_base">{

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
            mcu_base:config["mcu_base"]
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
                        const c = JSON.stringify([versionId,...op])
                        console.log(c);
                        req2(c)
                    }
                    s.req("config_get")
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
                    const [versionId2,macId2,api, info] = res;
                    if (["config_set","mcu_state_publish"].includes(api)) {
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