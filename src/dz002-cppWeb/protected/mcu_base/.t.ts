import { i18n_Tuple_t } from "../type"
export type mcu_base_t = [
    sendTo: string,
    version: string,
    versionId: string,
]
export type mcu_baseI18n_t = i18n_Tuple_t<mcu_base_t>;
export const mcu_baseI18n: mcu_baseI18n_t = ["转发", "版本", "版本号"]
