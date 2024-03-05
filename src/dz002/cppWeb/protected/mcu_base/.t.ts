import { i18n_Tuple_t } from "../type"
export type versionId_t=string
export type macId_t=string
export type mcu_baseConfig_t = [
    sendTo: string,
    version: string,
    versionId: versionId_t,
]
export type mcu_baseConfigI18n_t = i18n_Tuple_t<mcu_baseConfig_t>;
export const mcu_baseConfigI18n: mcu_baseConfigI18n_t = ["转发", "version", "versionId"]

export type mcu_state_t = [
    macId: macId_t,
    egBit: Array<0 | 1>,
    ETHlocalIP: string,
    WiFilocalIP: string
];
export type mcu_stateI18n_t = i18n_Tuple_t<mcu_state_t>;
export const mcu_stateI18n: mcu_stateI18n_t = ["macId", "bit", "EthlocIp", "WiFiLocIp"]
