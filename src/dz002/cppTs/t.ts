
import { name, version } from "../../../package.json"
import { md5 } from "js-md5"
import {
    mcu_base_t, mcu_baseI18n_t, mcu_baseI18n,
    mcu_state_t, mcu_stateI18n_t, mcu_stateI18n
} from "../cppWeb/protected/mcu_base/.t"
import { mcu_net_t, mcu_netI18n_t, mcu_netI18n } from "../cppWeb/protected/mcu_net/.t"
import { mcu_serial_t, mcu_serialI18n_t, mcu_serialI18n } from "../cppWeb/protected/mcu_ipcSerial/.t"
import { mcu_ybl_t, mcu_yblI18n_t, mcu_yblI18n, qa_t as mcu_ybl_qa_t } from "../cppWeb/protected/mcu_ybl/.t"
import {
    mcu_webPageServer_t, mcu_webPageServerI18n_t, mcu_webPageServerI18n,
    mcu_wsServer_t, mcu_wsServerI18n_t, mcu_wsServerI18n,
    mcu_esServer_t, mcu_esServerI18n_t, mcu_esServerI18n
} from "../cppWeb/protected/mcu_ipcServer/.t"

interface config_t {
    i18n: {
        mcu_base: mcu_baseI18n_t;
        mcu_net: mcu_netI18n_t;
        mcu_serial: mcu_serialI18n_t;
        mcu_ybl: mcu_yblI18n_t;
        mcu_webPageServer: mcu_webPageServerI18n_t;
        mcu_wsServer: mcu_wsServerI18n_t;
        mcu_esServer: mcu_esServerI18n_t;
        state: {
            mcu_base: mcu_stateI18n_t
        }
    };
    mcu_base: mcu_base_t;
    mcu_net: mcu_net_t;
    mcu_serial: mcu_serial_t;
    mcu_ybl: mcu_ybl_t;
    mcu_webPageServer: mcu_webPageServer_t;
    mcu_esServer: mcu_esServer_t;
    mcu_wsServer: mcu_wsServer_t;
}
export const config: config_t = {
    i18n: {
        mcu_base: mcu_baseI18n,
        mcu_net: mcu_netI18n,
        mcu_serial: mcu_serialI18n,
        mcu_ybl: mcu_yblI18n,
        mcu_webPageServer: mcu_webPageServerI18n,
        mcu_wsServer: mcu_wsServerI18n,
        mcu_esServer: mcu_esServerI18n,
        state: {
            mcu_base: mcu_stateI18n
        }
    },
    mcu_base: ["mcu_serial", [name, version, "dz002-cpp"].join("."), md5([name, version, "dz002-cpp"].join("."))],
    mcu_serial: [115200, "\n"],
    mcu_net: ["eth", ["apname"], ["shuzijia", "80508833"]],
    mcu_ybl: [{}, 600, 500000],
    mcu_webPageServer: ["http://1.com"],
    mcu_esServer: ["/es"],
    mcu_wsServer: ["/ws"],
}
interface publish_t {
    mcu_base: mcu_state_t
}
export interface state_t extends config_t {
    state: publish_t
}
//uart wsServer wsClient esServer bleServer udpServer   
export type on_t =
    ((...op: ["config_get"]) => ["config_set", config_t])
    | ((...op: ["config_set", Partial<config_t>]) => ["config_set", Partial<config_t>])
    | ((...op: ["config_toFileRestart"]) => void)
    | ((...op: ["config_fromFileRestart"]) => ["config_set", config_t])
    | ((...op: [`mcu_ybl_publish`]) => ["config_set", Pick<config_t, "mcu_ybl">])//cpp的ybl调用
    | (<T extends keyof publish_t>(...op: [`${T}_publish`]) => ["state_set", Pick<publish_t, T>])