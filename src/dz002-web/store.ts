import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import { reqIpcInit_t } from "@ui/type"
import type { } from 'zustand/middleware'//调试作用
import { state_t, configBase, i18n } from "./config"
import { api_t } from "./storeApi"
type req_t = (...op: Parameters<api_t>) => Promise<void>
// type ExpandRecursively<T> = T extends object
//   ? T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never
//   : T;
// type demo=ExpandRecursively<api_t>
interface store_t {
    state: state_t;
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
    const defReq: req_t = async (...str: any[]) => console.log("defReq", ...str)
    return {
        state: {
            ...configBase, i18n
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
                    s.req("mcu_state_get")
                })
            } else {
                seter(s => {
                    s.req = defReq
                })
            }
        },
        res: jsonstr => seter(s => {
            try {
                const data = JSON.parse(jsonstr) as Awaited<ReturnType<api_t>>//{ api: string, db: Partial<state_t>, token: string };
                if (typeof (data) === "object" && Array.isArray(data) && data[0] && typeof data[0] === "string" && data[0].endsWith("set")) {
                    s.state = { ...s.state, ...data[1] }
                    console.log("use", data);
                } else {
                    console.log("pass", data);
                }
            } catch (e) {
                console.error(jsonstr)
            }
        }),
        req: defReq,
    }
}))
export default useStore