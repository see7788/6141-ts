
import { name, version } from "../../package.json"
import { md5 } from "js-md5"
import { mcu_base_t, mcu_baseI18n_t, mcu_baseI18n } from "../dz002-cppWeb/protected/mcu_base/.t"
import { mcu_net_t, mcu_netI18n_t, mcu_netI18n } from "../dz002-cppWeb/protected/mcu_net/.t"
import { mcu_state_t, mcu_stateI18n_t, mcu_stateI18n } from "../dz002-cppWeb/protected/mcu_base_subscriber/.t"
import { mcu_serial_t, mcu_serialI18n_t, mcu_serialI18n } from "../dz002-cppWeb/protected/mcu_ipcSerial/.t"
import { mcu_ybl_t, mcu_yblI18n_t, mcu_yblI18n, qa_t as mcu_ybl_qa_t } from "../dz002-cppWeb/protected/mcu_ybl/.t"
import {
    mcu_webPageServer_t, mcu_webPageServerI18n_t, mcu_webPageServerI18n,
    mcu_wsServer_t, mcu_wsServerI18n_t, mcu_wsServerI18n,
    mcu_esServer_t, mcu_esServerI18n_t, mcu_esServerI18n
} from "../dz002-cppWeb/protected/mcu_ipcServer/.t"

export interface i18n_t {
    mcu_base: mcu_baseI18n_t;
    mcu_net: mcu_netI18n_t;
    mcu_state: mcu_stateI18n_t;
    mcu_serial: mcu_serialI18n_t;
    mcu_ybl: mcu_yblI18n_t;
    mcu_webPageServer: mcu_webPageServerI18n_t;
    mcu_wsServer: mcu_wsServerI18n_t;
    mcu_esServer: mcu_esServerI18n_t
}
export const i18n: i18n_t = {
    mcu_base: mcu_baseI18n,
    mcu_net: mcu_netI18n,
    mcu_state: mcu_stateI18n,
    mcu_serial: mcu_serialI18n,
    mcu_ybl: mcu_yblI18n,
    mcu_webPageServer: mcu_webPageServerI18n,
    mcu_wsServer: mcu_wsServerI18n,
    mcu_esServer: mcu_esServerI18n
}
export interface config_t {
    mcu_base: mcu_base_t;
    mcu_net: mcu_net_t;
    mcu_serial: mcu_serial_t;
    mcu_ybl: mcu_ybl_t;
    mcu_webPageServer: mcu_webPageServer_t;
    mcu_esServer: mcu_esServer_t;
    mcu_wsServer: mcu_wsServer_t;
}
export const config: config_t = {
    mcu_base: ["mcu_serial", [name, version, "dz002-cpp"].join("."), md5([name, version, "dz002-cpp"].join("."))],
    mcu_serial: [115200, "\n"],
    mcu_net: ["eth", ["apname"], ["shuzijia", "80508833"]],
    mcu_ybl: [{}, 600, 500000],
    mcu_webPageServer: ["http://1.com"],
    mcu_esServer: ["/es"],
    mcu_wsServer: ["/ws"],
}
export interface state_t extends config_t {
    i18n: i18n_t;
    mcu_base_subscriber: mcu_state_t
}
export type qa_subscriber_t = <T extends "mcu_base_subscriber">(...op: [T]) => ["set", Pick<state_t, T>]
export type qa_i18n_get_t = ((...op: ["i18n_get"]) => ["set", Pick<state_t, "i18n">])
export type qa_i18n_set_t = ((...op: ["i18n_set", i18n_t]) => ["set", Pick<state_t, "i18n">])
export type qa_config_get_t = ((...op: ["config_get"]) => ["set", config_t])
export type qa_config_set_t = ((...op: ["config_set", Pick<config_t, keyof config_t> | Partial<config_t>]) => ["config_set", config_t])
export type qa_config_toFileRestart_t = (...op: ["config_toFileRestart", Partial<config_t>]) => ["set", config_t]
export type qa_config_fromFileRestart_t = (...op: ["config_fromFileRestart"]) => ["set", config_t]
export type qa_t =
    qa_subscriber_t
    | qa_i18n_get_t
    | qa_i18n_set_t
    | qa_config_get_t
    | qa_config_set_t
    | qa_config_toFileRestart_t
    | qa_config_fromFileRestart_t
// export type qa_t =
//     ((...op: ["i18n_get"]) => ["set", Pick<state_t, "i18n">])
//     | ((...op: ["i18n_set", i18n_t]) => ["set", Pick<state_t, "i18n">])
//     | ((...op: ["config_get"]) => ["set", config_t])
//     | ((...op: ["config_set", Pick<config_t, keyof config_t> | Partial<config_t>]) => ["set", config_t])
//     | ((...op: ["config_toFileRestart", Partial<config_t>]) => ["set", config_t])
//     | ((...op: ["config_fromFileRestart"]) => ["set", config_t])
//     | ((...op: ["subscriber",boolean]) => ["set"，Pick<state_t, "mcu_state">])