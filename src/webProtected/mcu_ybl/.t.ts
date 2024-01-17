import { i18n_Tuple_t } from "../type"
export type mcu_ybl_idInfo_t = {
     type: number;
     state: number;
}
export type mcu_ybl_t = [
     onSendTo: string, 
     datas: Record<string, mcu_ybl_idInfo_t>, 
     tick: number, 
     tickBig: number
]
export type mcu_yblI18n_t = i18n_Tuple_t<mcu_ybl_t>;
export const mcu_yblI18n:mcu_yblI18n_t=["转发至", "数据", "信息tick", "心跳tick"]