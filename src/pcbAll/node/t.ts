
import { yblIdsState_t as dz002_yblState_t } from "../../pcbDz002/web/protected/mcu_ybl/.t"
import { on_t as dz002_on_t } from "../../pcbDz002/cpp/t"
import type WsClient from "ws"
type yblId_t = keyof dz002_yblState_t
type dz002_yblConfig_t = Record<yblId_t, {
    //用途
    //位置
}>
type dz002_mcuConfig_t = {
    //房间名
    //楼层
    //男女
}
type dz002_t = {
    mcuConfig: dz002_mcuConfig_t;
    yblConfig: dz002_yblConfig_t;
    yblState: dz002_yblState_t;
    wsOnLine: WsClient
}
type dz002s_t = Record<string, dz002_t>
type dz002s_id_t = keyof dz002s_t
export interface Store_t {
    //dz002s设备服务
    dz002s: {
        db: dz002s_t;
        dbOn: (...op:
            | [dz002s_id_t, ...Extract<ReturnType<dz002_on_t>, ["dz002s_yblState_publish", ...any[]]>]
            | [dz002s_id_t, "dz002s_yblConfig_set", dz002_yblConfig_t]
            | [dz002s_id_t, "dz002s_mcuConfig_set", dz002_mcuConfig_t]
            | [dz002s_id_t, "dz002s_set", dz002_t]
            | [dz002s_id_t, "dz002s_wsconnection_set", WsClient]
            | [dz002s_id_t, "dz002s_wsclose_set", dz002s_id_t]
        ) => ["dz002s_set", { dz002s: dz002s_t }]
        ws: {
            //  sendTo: (...op: [WsClient,...Parameters<dz002_on_t>]) => {};
            // connection: (...op: Extract<Parameters<Store_t["dz002s"]["dbOn"]>, ["dz002s_wsconnection_set", ...any[]]>) => ReturnType<Store_t["dz002s"]["sendToAll"]>
            // close: (...op: Extract<Parameters<Store_t["dz002s"]["dbOn"]>, ["dz002s_wsclose_set", ...any[]]>) => ReturnType<Store_t["dz002s"]["sendToAll"]>;
            onMessage: (
                ...op:
                    | Extract<Parameters<Store_t["dz002s"]["dbOn"]>, [dz002s_id_t, "dz002s_yblState_publish", ...any[]]>
                //    | Exclude<Parameters<Store_t["admins"]["ws"]["sendToAll"]>,ReturnType<Store_t["dz002s"]["dbOn"]>>
            ) => ReturnType<Store_t["admins"]["ws"]["sendToAll"]> | ReturnType<Store_t["visitor"]["ws"]["sendToAll"]>
        };
        // Http: {
        //     onMessage: () => {}
        //    // EventSource: () => {}
        // }
    };
    //管理服务
    admins: {
        ws: {
            sendToAll: (...op:
                | ReturnType<Store_t["dz002s"]["dbOn"]>
                // | [dz002s_id_t,...Exclude<ReturnType<dz002_on_t>, void>]
            ) => void;
            sendTo: (...op: [WsClient, ...Extract<Parameters<Store_t["admins"]["ws"]["sendToAll"]>, ["dz002s_set", ...any[]]>]) => void;
            onMessage: (
                ...op:
                    | Extract<Parameters<Store_t["dz002s"]["dbOn"]>, [dz002s_id_t, "dz002s_yblConfig_set" | "dz002s_mcuConfig_set" | "dz002s_set", ...any[]]>
                // |Parameters<Store_t["dz002s"]["ws"]["sendTo"]>
            ) => ReturnType<Store_t["admins"]["ws"]["sendToAll"]> | ReturnType<Store_t["visitor"]["ws"]["sendToAll"]>
        };
        // Http: {
        //     onMessage: () => {}
        //     EventSource: () => {}
        // }
    };
    //访客服务
    visitor: {
        ws: {
            sendToAll: (...op: ReturnType<Store_t["dz002s"]["dbOn"]>) => void;
            sendTo: (...op: [WsClient, ...Extract<Parameters<Store_t["visitor"]["ws"]["sendToAll"]>, ["dz002s_set", ...any[]]>]) => void;
        };
        // Http: {
        //     onMessage: () => {}
        //     EventSource: () => {}
        // }
    }
}