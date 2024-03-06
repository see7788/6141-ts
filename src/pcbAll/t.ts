
import { mcu_ybl_idInfo_t as mcu_yblId_BaseInfo_t, mcu_ybldatas_t } from "../pcbDz002/cppWeb/protected/mcu_ybl/.t"
import { macId_t, on_t as dz002_on_t } from "../pcbDz002/cppUse/t"
import type WsClient from "ws"
type yblId_t = keyof mcu_ybldatas_t
interface dz002s_yblId_moreInfo_t {
    id: yblId_t
    //用途
    //位置
}
interface dz002s_yblIdInfo_t extends mcu_yblId_BaseInfo_t, dz002s_yblId_moreInfo_t { }
interface dz002s_mcuId_moreInfo_t {
    id: macId_t

    //房间名
    //楼层
    //男女
}
interface dz002_mcusId_info_t extends dz002s_mcuId_moreInfo_t {
    ybl: dz002s_yblIdInfo_t
}
type user_t = [admin: string, pass: string]
type dz002s_cacheDb_t = Record<macId_t, dz002_mcusId_info_t>;
type dz002s_cachePublish_t = ["dz002s_publish", dz002s_cacheDb_t];
type admins_cacheDb_t = Array<user_t>;
type admins_cachePublish_t = ["admins_publish", admins_cacheDb_t]
export interface Store_t {
    dz002s: {
        data: {
            cache: dz002s_cacheDb_t;
            sql: {
                initCacheDb: () => void;
                setCacheDb: (op: dz002s_yblId_moreInfo_t) => void;
            };
            dz002s: {
                ws: {
                    server: WsClient.Server;
                    clis: Map<macId_t, WsClient>;
                    login: (c: macId_t) => void | true;//是否掐断
                    on: (
                        ...op: Extract<ReturnType<dz002_on_t>, [macId_t, "mcu_ybldatas_publish", ...any[]]>
                    ) => dz002s_cachePublish_t;//admin.ws.send&user.ws.send
                }
            }
            admins: {
                ws: {
                    on: (...op:
                        ["dz002s_yblId_moreInfo_set", dz002s_yblId_moreInfo_t, macId_t] |
                        ["dz002s_mcuId_moreInfo_set", dz002s_mcuId_moreInfo_t, macId_t]
                    ) => dz002s_cachePublish_t;//admin.ws.send&user.ws.send
                }
            }
        };
        ws: {
            send: (...op: Parameters<dz002_on_t>) => void;
            on: (
                ...op:
                    Parameters<Store_t["dz002s"]["data"]["dz002s"]["ws"]["on"]> |//调用
                    Exclude<ReturnType<dz002_on_t>, void | Parameters<Store_t["dz002s"]["data"]["dz002s"]["ws"]["on"]>>////调用admin.ws.send
            ) => void
        };

    };
    admins: {
        data: {
            cache: admins_cacheDb_t;
            sql: {
                initCacheDb: () => void;
                setCacheDb: (op: dz002s_mcuId_moreInfo_t) => void;
            };
            admins: {
                ws: {
                    server: WsClient.Server;
                    clis: Map<string, WsClient>;
                    login: (c: user_t) => void | admins_cachePublish_t;//掐断||admin.ws.send
                    on: (...op: admins_cachePublish_t) => admins_cachePublish_t;////调用admin.ws.send
                }
            }
        };
        ws: {
            on: (
                ...op: Parameters<
                    Store_t["dz002s"]["ws"]["send"] |//调用
                    Store_t["dz002s"]["data"]["dz002s"]["ws"]["on"] |//调用
                    Store_t["admins"]["data"]["admins"]["ws"]["on"]//调用
                >
            ) => void
            send: (...op: Exclude<
                ReturnType<
                    dz002_on_t |
                    Store_t["dz002s"]["data"]["dz002s"]["ws"]["on"] |
                    Store_t["dz002s"]["data"]["admins"]["ws"]["on"] |
                    Store_t["admins"]["data"]["admins"]["ws"]["login"] |
                    Store_t["admins"]["data"]["admins"]["ws"]["on"]
                >,
                void | true | Parameters<Store_t["dz002s"]["data"]["admins"]["ws"]["on"]>
            >
            ) => void;
        }
    };
    users: {
        data: {
            users: {
                ws: {
                    server: WsClient.Server;
                }
            }
        };
        ws: {
            send: (...op:
                Exclude<ReturnType<
                    Store_t["dz002s"]["data"]["dz002s"]["ws"]["on"]
                >, void | true>
            ) => void;
        }
    };
}
