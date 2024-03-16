
import { mcu_ybl_idInfo_t as yblIdBaseInfo_t, mcu_ybldatas_t as yblstate_t } from "../pcbDz002/cppWeb/protected/mcu_ybl/.t"
import { macId_t, on_t as dz002_on_t } from "../pcbDz002/cppUse/t"
import type WsClient from "ws"
type yblId_t = keyof yblstate_t
type userId_t = string
type dz002s_t = Record<macId_t, {
    id: macId_t;
    yblsconfig: Record<yblId_t, {
        //用途
        //位置
    }>;
    yblstate: yblstate_t;
    //房间名
    //楼层
    //男女
}>
type admins_t = Record<userId_t, {
    id: userId_t;
    pass: string;
}>;
export type State_t = {
    dz002s: dz002s_t;
    admins: admins_t;
};
export interface Store_t {
    state: State_t;
    on: {
        admins_connectionIng: (
            id: userId_t, connectionIng: boolean
        ) => void | ["cache_set", Pick<State_t, "admins">];//user.ws.send.toALL
        dz002s_connectionIng: (
            id: macId_t, connectionIng?: boolean
        ) => void | ["cache_set", Pick<State_t, "dz002s">];//user.ws.send.toALL
        mcu_ybldatas_publish: (
            ...op: Extract<ReturnType<dz002_on_t>, ["mcu_ybldatas_publish", ...any[]]>
        ) => void | ["cache_set", Pick<State_t, "dz002s">];//admin.ws.send.toALL&user.ws.send.toALL
        yblsconfig_set: (
            ...op: ["yblsconfig_set", State_t["dz002s"][macId_t]["yblsconfig"], macId_t]
        ) => void | ["cache_set", Pick<State_t, "dz002s">];//调用admin.ws.send.toALL&user.ws.send.toALL
    };
    //dz002s设备
    dz002s: {
        ws: {
            server: WsClient.Server;
            clis: Map<macId_t, WsClient>;
            sendTo: (...op: Parameters<dz002_on_t>) => void
            onMessage: (
                ...op:
                    Parameters<Store_t["on"]["mcu_ybldatas_publish"]>//调用
                //   | Exclude<ReturnType<dz002_on_t>, void | Parameters<Store_t["cache"]["mcu_ybldatas_publish"]>>//调用admins.ws.send.toAll
            ) => void
        };
    };
    //管理员
    admins: {
        ws: {
            server: WsClient.Server;
            clis: Map<string, WsClient>;
            onMessage: (
                ...op:
                    Parameters<Store_t["on"]["yblsconfig_set"]>
                    | Parameters<Store_t["dz002s"]["ws"]["sendTo"]>
            ) => void
            sendToAll: (...op:
                Exclude<ReturnType<
                    dz002_on_t
                    | Store_t["on"]["dz002s_connectionIng"]
                    | Store_t["on"]["admins_connectionIng"]
                    | Store_t["on"]["mcu_ybldatas_publish"]
                    | Store_t["on"]["yblsconfig_set"]
                >
                    ,
                    void | Parameters<Store_t["on"]["mcu_ybldatas_publish"]>
                >
            ) => void;
        }
    };
    //访客
    users: {
        ws: {
            server: WsClient.Server;
            sendToAll: (
                ...op: Exclude<ReturnType<
                    Store_t["on"]["mcu_ybldatas_publish"]
                    | Store_t["on"]["yblsconfig_set"]
                >
                    ,
                    void>
            ) => void;
        }
    }
}