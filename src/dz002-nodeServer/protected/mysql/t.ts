import { mcu_ybl_idInfo_t } from "../../../dz002-cppWeb/protected/mcu_ybl/.t"
//ybl传感器
export interface ybl_table_t extends mcu_ybl_idInfo_t {
    id: string;//433信号id
    id_mac: string
}
interface mac_table_t {
    id: number;
    mac_code: string;
}
export type api_t =
    ((...op: ["mac_install", Omit<mac_table_t, "id">]) => number)
    | ((...op: ["mac_set", mac_table_t]) => number)
    | ((...op: ["mac_del", mac_table_t["id"]]) => number)
    | ((...op: ["ybl_install", Omit<ybl_table_t, "id">]) => number)
    | ((...op: ["ybl_set", ybl_table_t]) => number)
    | ((...op: ["ybl_del", ybl_table_t["id"]]) => number)