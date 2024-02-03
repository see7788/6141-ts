import { i18n_Tuple_t } from "../type"
export type mcu_ybl_idInfo_t = {
     type: number;
     state: number;
}
export type mcu_ybldatas_t = Record<string, mcu_ybl_idInfo_t>
export type mcu_ybl_t = [
     datas: mcu_ybldatas_t,
     tick: number,
     tickBig: number
]
export type mcu_yblI18n_t = i18n_Tuple_t<mcu_ybl_t>;
export const mcu_yblI18n: mcu_yblI18n_t = ["数据", "信息tick", "心跳tick"]


export type qa_t = ((...op: ["mcu_ybl.config_set", mcu_ybl_t]) => ["set", { "mcu_ybl": mcu_ybl_t }]) |
     ((...op: ["mcu_ybl.config_get"]) => ["set", { "mcu_ybl": mcu_ybl_t }])
// type send_t = Parameters<qa_t>
// type on_t =ReturnType<qa_t>