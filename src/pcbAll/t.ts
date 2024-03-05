
import { mcu_ybl_idInfo_t as yblId_base_t, mcu_ybldatas_t } from "../pcbDz002/cppWeb/protected/mcu_ybl/.t"
import { macId_t, on_t as dz002_on_t, versionId_t } from "../pcbDz002/cppUse/t"
import type WsClient from "ws"
type yblId_t = keyof mcu_ybldatas_t
interface dz002_mcusId_yblId_other_t {
    id: yblId_t
    //用途
    //位置
}
interface dz002_mcusId_yblId_info_t extends yblId_base_t, dz002_mcusId_yblId_other_t {
}
interface dz002_mcusId_other_t {
    id: macId_t
    ybl: dz002_mcusId_yblId_info_t
    //房间名
    //楼层
    //男女
}
interface dz002_mcusId_info_t extends dz002_mcusId_other_t { }
type user_t = [admin: string, pass: string]
type dz002cache_t = Record<macId_t, dz002_mcusId_info_t>;
type dz002_cachePublish_t = ["dz002_cachePublish", dz002cache_t];
type admincache_t = Array<user_t>;
type admin_cachePublish_t = ["admin_cachePublish", admincache_t]
export interface Store_t {
    dz002: {
        cache: {
            db: dz002cache_t;
            fun: {
                dz002: {
                    ws: {
                        login: (c: macId_t) => void | true;//是否掐断
                        on: (
                            ...op: Extract<ReturnType<dz002_on_t>, [versionId_t, "mcu_ybldatas_publish", ...any[]]>
                        ) => dz002_cachePublish_t;//admin.ws.send&user.ws.send
                    }
                }
                admin: {
                    ws: {
                        on: (...op:
                            ["dz002_mcusId_yblId_other_set", dz002_mcusId_yblId_other_t, macId_t] |
                            ["dz002_mcusId_other_set", dz002_mcusId_other_t, macId_t]
                        ) => dz002_cachePublish_t;//admin.ws.send&user.ws.send
                    }
                }
            }
        };
        ws: {
            clis: Map<macId_t, WsClient>;
            server: WsClient.Server;
            fun: {
                send: (...op: Parameters<dz002_on_t>) => void;
                on: (
                    ...op:
                        Parameters<Store_t["dz002"]["cache"]["fun"]["dz002"]["ws"]["on"]> |//调用
                        Exclude<ReturnType<dz002_on_t>, void | Parameters<Store_t["dz002"]["cache"]["fun"]["dz002"]["ws"]["on"]>>//admin.ws.send
                ) => void
            }
        };

    };
    admin: {
        cache: {
            db: admincache_t;
            fun: {
                admin: {
                    ws: {
                        login: (c: user_t) => void | admin_cachePublish_t;//掐断||admin.ws.send
                        on: (...op: admin_cachePublish_t) => admin_cachePublish_t;//admin.ws.send
                    }
                }
            };
        };
        ws: {
            server: WsClient.Server;
            clis: Map<string, WsClient>;
            fun: {
                on: (
                    ...op: Parameters<
                        Store_t["dz002"]["ws"]["fun"]["send"] |
                        Store_t["dz002"]["cache"]["fun"]["dz002"]["ws"]["on"] |
                        Store_t["admin"]["cache"]["fun"]["admin"]["ws"]["on"]
                    >//调用
                ) => void
                send: (...op: Exclude<
                    ReturnType<
                        dz002_on_t |
                        Store_t["dz002"]["cache"]["fun"]["dz002"]["ws"]["on"] |
                        Store_t["dz002"]["cache"]["fun"]["admin"]["ws"]["on"] |
                        Store_t["admin"]["cache"]["fun"]["admin"]["ws"]["login"] |
                        Store_t["admin"]["cache"]["fun"]["admin"]["ws"]["on"]
                    >,
                    void | true | Parameters<Store_t["dz002"]["cache"]["fun"]["admin"]["ws"]["on"]>
                >
                ) => void;
            }
        }

    };
    user: {
        ws: {
            server: WsClient.Server;
            fun: {
                send: (...op:
                    Exclude<ReturnType<
                        Store_t["dz002"]["cache"]["fun"]["dz002"]["ws"]["on"]
                    >, void | true>
                ) => void;
            }
        }
    };
}
