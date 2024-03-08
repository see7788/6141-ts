
import { mcu_ybl_idInfo_t as yblIdBaseInfo_t, mcu_ybldatas_t } from "../pcbDz002/cppWeb/protected/mcu_ybl/.t"
import { macId_t, on_t as dz002_on_t } from "../pcbDz002/cppUse/t"
import type WsClient from "ws"
type yblId_t = keyof mcu_ybldatas_t
interface yblIdMoreInfo_t {
    id: yblId_t
    //用途
    //位置
}
interface yblIdInfo_t extends yblIdBaseInfo_t, yblIdMoreInfo_t { }
interface mcuIdMoreInfo_t {
    id: macId_t
    //房间名
    //楼层
    //男女
}
interface mcuIdInfo_t extends mcuIdMoreInfo_t { }
interface IdMoreInfo_t {
    ybl: yblIdMoreInfo_t,
    mcu: mcuIdMoreInfo_t
}
type user_t = [admin: string, pass: string]
interface cache_t {
    ybls: Record<yblId_t, yblIdInfo_t>;
    mcus: Record<macId_t, mcuIdInfo_t>;
    admins: Record<string, user_t>
}
export interface Store_t {
    dz002s: {
        cache: Pick<cache_t, "ybls" | "mcus">
        on_dz002sCconnection: (...c: [macId_t]) => true|void
        on_dz002s: (...op: Extract<ReturnType<dz002_on_t>, [macId_t, "mcu_ybldatas_publish", ...any[]]>) => ["cache_set", Partial<Store_t["dz002s"]["cache"]>]//admin.ws.send&user.ws.send
        on_admins: <K extends keyof IdMoreInfo_t>(...op: ["IdMoreInfo_set", Pick<IdMoreInfo_t, K>]) => ["IdMoreInfo_set", Partial<Store_t["dz002s"]["cache"]>]//调用admin.ws.send&user.ws.send
        ws: {
            server: WsClient.Server;
            clis: Record<macId_t, WsClient>;
            onConnection: (
                ...op: [WsClient,...Parameters<Store_t["dz002s"]["on_dz002sCconnection"]>]//调用if(!dz002s.connection())掐断
            ) => void;
            onClose:(cli:macId_t)=>void;
            onMessage: ((
                ...op: Parameters<Store_t["dz002s"]["on_dz002s"]>//调用
            ) => void)
            | ((
                ...op: Exclude<ReturnType<dz002_on_t>, void | Parameters<Store_t["dz002s"]["on_admins"]>>//调用admin.ws.send
            ) => void)
            send: (...op: [macId_t,...Parameters<dz002_on_t>]) => void;
        };
    };
    admins: {
        cache: Pick<cache_t, "admins">;
        on_adminsConnection: (...c: [user_t]) => void | ["cache_set", cache_t];
        ws: {
            server: WsClient.Server;
            clis: Map<string, WsClient>;
            onConnection: (
                ...c: Parameters<Store_t["admins"]["on_adminsConnection"]>//if(admins.adminsConnection()){admins.ws.send}else{掐断}
            ) => void;
            onMessage: ((...op: Parameters<
                dz002_on_t |
                Store_t["dz002s"]["on_admins"] //调用
            >) => void);
            send: (...op: Exclude<ReturnType<
                dz002_on_t |
                Store_t["dz002s"]["on_dz002s"] |
                Store_t["dz002s"]["on_admins"] |
                Store_t["admins"]["on_adminsConnection"]
            >, void | Parameters<Store_t["dz002s"]["on_dz002s"]>>
            ) => void;
        }
    };
    users: {
        ws: {
            server: WsClient.Server;
            onConnection: () => void;
            send: (...op: ReturnType<Store_t["dz002s"]["on_dz002s"] | Store_t["dz002s"]["on_admins"]>) => void;
        }
    };
}
