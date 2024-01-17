import { i18n_Tuple_t } from "../../type"
export enum gender_t {
    girl, boy
}
export type mcu_fangjian_t = [
    gender: gender_t,//男女
    floor: number,//楼层
    name: string,//位置名称
]
export type mcu_fangjianI18n_t = i18n_Tuple_t<mcu_fangjian_t>;
export const mcu_baseI18n: mcu_fangjianI18n_t = ["男女", "楼层", "位置名称"]
export const genderI18n: [string, string] = ["girl", "boy"];