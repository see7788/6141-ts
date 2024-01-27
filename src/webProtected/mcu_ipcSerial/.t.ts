import { i18n_Tuple_t } from "@ui/type"
export type mcu_serial_t=[BaudRate: number, endStr: string];
export type mcu_serialI18n_t = i18n_Tuple_t<mcu_serial_t>;
export const mcu_serialI18n:mcu_serialI18n_t=["波特率", "分割符"]
