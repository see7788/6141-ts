import { i18n_Tuple_t } from "../type"
export type mcu_wsClinet_t=[ip: string, port: number];
export type mcu_wsClinetI18n_t = i18n_Tuple_t<mcu_wsClinet_t>;
export const mcu_wsClinetI18n:mcu_wsClinetI18n_t=["ip","端口"]