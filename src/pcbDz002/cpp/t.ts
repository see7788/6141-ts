
import { name, version } from "../../../../package.json"
import { md5 } from "js-md5"
import {
    versionId_t,
    mcu_baseConfig_t, mcu_baseConfigI18n_t, mcu_baseConfigI18n,
    mcu_state_t, mcu_stateI18n_t, mcu_stateI18n
} from "../web/protected/mcu_base/.t"
import { mcu_net_t, mcu_netI18n_t, mcu_netI18n } from "../web/protected/mcu_net/.t"
import { mcu_serial_t, mcu_serialI18n_t, mcu_serialI18n } from "../web/protected/mcu_ipcSerial/.t"
import { mcu_ybl_t, mcu_yblI18n_t, mcu_yblI18n, qa_t as mcu_ybl_qa_t } from "../web/protected/mcu_ybl/.t"
import {
    mcu_webPageServer_t, mcu_webPageServerI18n_t, mcu_webPageServerI18n,
    mcu_wsServer_t, mcu_wsServerI18n_t, mcu_wsServerI18n,
    mcu_esServer_t, mcu_esServerI18n_t, mcu_esServerI18n
} from "../web/protected/mcu_ipcServer/.t"
interface config_t {
    i18n: {
        mcu_base: mcu_baseConfigI18n_t;
        mcu_net: mcu_netI18n_t;
        mcu_serial: mcu_serialI18n_t;
        mcu_ybl: mcu_yblI18n_t;
        mcu_webPageServer: mcu_webPageServerI18n_t;
        mcu_wsServer: mcu_wsServerI18n_t;
        mcu_esServer: mcu_esServerI18n_t;
        mcu_state: mcu_stateI18n_t
    };
    mcu_base: mcu_baseConfig_t;
    mcu_net: mcu_net_t;
    mcu_serial: mcu_serial_t;
    mcu_ybl: mcu_ybl_t;
    mcu_webPageServer: mcu_webPageServer_t;
    mcu_esServer: mcu_esServer_t;
    mcu_wsServer: mcu_wsServer_t;
}
const versionStr = [name, version, "dz002-cpp"].join(".");
export const versionId: versionId_t = md5(versionStr)
export const config: config_t = {
    i18n: {
        mcu_base: mcu_baseConfigI18n,
        mcu_net: mcu_netI18n,
        mcu_serial: mcu_serialI18n,
        mcu_ybl: mcu_yblI18n,
        mcu_webPageServer: mcu_webPageServerI18n,
        mcu_wsServer: mcu_wsServerI18n,
        mcu_esServer: mcu_esServerI18n,
        mcu_state: mcu_stateI18n
    },
    mcu_base: ["mcu_serial", versionStr, versionId],
    mcu_serial: [115200, "\n"],
    mcu_net: ["ap", ["apname"], ["shuzijia", "80508833"]],
    mcu_ybl: [{}, 600, 500000],
    mcu_webPageServer: ["http://1.com"],
    mcu_esServer: ["/es"],
    mcu_wsServer: ["/ws"],
}
export interface State_t extends config_t {
    mcu_state: mcu_state_t,
}
export { type versionId_t }
type publish_t = ["mcu_state_publish", Pick<State_t, "mcu_state">]
    | ["dz002s_yblState_publish", state: State_t["mcu_ybl"][0]]
//uart wsServer wsClient esServer bleServer udpServer   
export type on_t =
    ((...op: ["config_get"]) => ["config_set", config_t])
    | ((...op: ["config_set", Partial<config_t>]) => ["config_set", Partial<config_t>])
    | ((...op: ["config_fromFile" | "config_toFile"]) => ["config_set", config_t])
    | ((...op: ["mcuRestart"]) => void)
    | ((...op: [publish_t[0]]) => [...publish_t])
    | ((...op: ["initGet", versionId_t]) => ["initGet", State_t])


// type t = [1, 2, "", ""] | [3, 4, "", ""] | [5, "", ""];

// type OmitLastTwo<T extends any[]> = T extends [...infer U, infer _1, infer _2] ? U : never;

// // 测试
// type Result = OmitLastTwo<t>; // 结果为 [1, 2, ""] | [3, 4, ""] | [5, ""]