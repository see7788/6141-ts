
import { mcu_ybl_idInfo_t as yblIdBaseInfo_t, mcu_ybldatas_t as yblstate_t } from "../../pcbDz002/cppWeb/protected/mcu_ybl/.t"
import { macId_t, on_t as dz002_on_t } from "../../pcbDz002/cppUse/t"
import type WsClient from "ws"
type yblId_t = keyof yblstate_t
type ersId_t = string
type dz002s_t = Record<ersId_t, {
    id: ersId_t;
    yblsconfig: Record<yblId_t, {
        //用途
        //位置
    }>;
    yblsstate: yblstate_t;
    //房间名
    //楼层
    //男女
}>
type ers_t = Record<ersId_t, {
    id: ersId_t;
    wsCli?:WsClient;
    pass: string;
}>;
export type State_t = {
    dz002s: dz002s_t;
    ers: ers_t;
};
export interface Store_t {
    state: State_t;
    stateApi: {
        dz002s: ["state_set", Pick<State_t, "dz002s">]
        ers: ["state_set", Pick<State_t, "ers">];
        all: ["state_set", State_t];
        dz002s_connectionIng: (
            id: ersId_t, connectionIng: boolean
        ) => ReturnType<Store_t["admins"]["ws"]["sendToAll"]>// Store_t["stateApi"]["ers"]
        admins_connectionIng: <T extends boolean>(
            id: ersId_t, connectionIng: T
        ) => T extends true
            ? ReturnType<Store_t["admins"]["ws"]["sendTo"]>//Store_t["stateApi"]["all"]
            : ReturnType<Store_t["admins"]["ws"]["sendToAll"]>// Store_t["stateApi"]["ers"]
        visitor_connectionIng: <T extends boolean>(
            id: ersId_t, connectionIng: T
        ) => T extends true
            ? (
                ReturnType<Store_t["visitor"]["ws"]["sendTo"]>//Store_t["stateApi"]["dz002s"]
                & ReturnType<Store_t["admins"]["ws"]["sendToAll"]>//Store_t["stateApi"]["ers"]
            )
            : ReturnType<Store_t["admins"]["ws"]["sendToAll"]>// Store_t["stateApi"]["ers"]
        ;
        mcu_ybldatas_publish: (
            ...op: Extract<ReturnType<dz002_on_t>, ["mcu_ybldatas_publish", ...any[]]>
        ) => ReturnType<Store_t["visitor"]["ws"]["sendTo"]>//Store_t["stateApi"]["dz002s"]
            & ReturnType<Store_t["admins"]["ws"]["sendToAll"]>;//Store_t["stateApi"]["dz002s"]
        yblsconfig_set: (
            ...op: ["yblsconfig_set", State_t["dz002s"][macId_t]["yblsconfig"], macId_t]
        ) => ReturnType<Store_t["admins"]["ws"]["sendToAll"]>// Store_t["stateApi"]["dz002s"]
            & ReturnType<Store_t["visitor"]["ws"]["sendTo"]>//Store_t["stateApi"]["dz002s"]
    };
    server:{
        
    }
    //dz002s设备服务
    dz002s: {
        ws: {
            onMessage: (
                ...op:
                    Parameters<Store_t["stateApi"]["mcu_ybldatas_publish"]>//调用
                    | Exclude<Parameters<Store_t["admins"]["ws"]["sendToAll"]>, Parameters<Store_t["stateApi"]["mcu_ybldatas_publish"]>>//调用
            ) => void
            sendTo: (...op: [ersId_t, ...Parameters<dz002_on_t>]) => void
           // sendToAll: ()=>void
        };
    };
    //管理服务
    admins: {
        ws: {
            onMessage: (
                ...op:
                    Parameters<Store_t["stateApi"]["yblsconfig_set"]>//调用
                    | Parameters<Store_t["dz002s"]["ws"]["sendTo"]>//调用
            ) => void
            sendTo: (...op: [ersId_t, ...Store_t["stateApi"]["ers"]]) => void
            sendToAll: (...op: Store_t["stateApi"]["dz002s"] | Exclude<ReturnType<dz002_on_t>, void>) => void;
        }
    };
    //访客服务
    visitor: {
        ws: {
            sendTo: (...op: [ersId_t, ...Store_t["stateApi"]["dz002s"]]) => void
            sendToAll: (...op: Store_t["stateApi"]["dz002s"]) => void;
        }
    }
}
