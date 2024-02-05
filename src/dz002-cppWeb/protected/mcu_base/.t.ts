import { i18n_Tuple_t } from "../type"
export type mcu_base_t = [
    sendTo: string,
    version: string,
    versionId: string,
    
]
export type mcu_baseI18n_t = i18n_Tuple_t<mcu_base_t>;
export const mcu_baseI18n: mcu_baseI18n_t = ["转发", "版本", "版本号"]

export type mcu_state_t = [
    macId: string,
    egBit: Array<0 | 1>,
    ETHlocalIP: string,
    WiFilocalIP: string
];
export type mcu_stateI18n_t = i18n_Tuple_t<mcu_state_t>;
export const mcu_stateI18n: mcu_stateI18n_t = ["macId", "bit", "EthlocIp", "WiFiLocIp"]
