import { immer } from 'zustand/middleware/immer'
import { create } from "zustand"
import { reqIpcInit_t } from "@ui/type"
import type { } from 'zustand/middleware'//调试作用
import { config, state_t, qa_t } from "../dz002-cpp/t"
type req_t = (...op: Parameters<qa_t>) => Promise<void>
// type ExpandRecursively<T> = T extends shuobject
//   ? T extends infer O ? { [K in keyof O]: ExpandRecursively<O[K]> } : never
//   : T;
// type demo=ExpandRecursively<qa_t>
interface store_t {
    state: Partial<state_t>;// Partial<Omit<state_t, "i18n">> & Pick<state_t, "i18n">;
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
            i18n:config["i18n"]
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
                    s.req("config_get")
                    // s.req("mcu_base_subscriber")
                })
            } else {
                seter(s => {
                    s.req = defReq
                })
            }
        },
        res: jsonstr => seter(s => {
            try {
                const data = JSON.parse(jsonstr) as Awaited<ReturnType<qa_t>>//{ api: string, db: Partial<state_t>, token: string };
                if (Array.isArray(data) && data[0] && typeof data[0] === "string" && data[0].endsWith("set")) {
                    s.state = { ...s.state, ...data[1] }
                    console.log({ data, state: s.state });
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