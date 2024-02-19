
import { mcu_ybl_idInfo_t, mcu_ybldatas_t, mcu_ybl_t } from "../../../dz002/cppWeb/protected/mcu_ybl/.t"
import { on_t as mcu_on_t, state_t as mcu_state_t } from "../../../dz002/cppTs/t"
export type { mcu_on_t }
export type id_mcu_t = string//mac地址
export type id_ybl_t=number//信号id
export type id_admin_t=number//
export interface ybl_t extends mcu_ybl_idInfo_t {
    id: id_ybl_t
    id_mcu: id_mcu_t,
    //用途等等
}
export interface mcu_t {
    id: id_mcu_t
    name?: string
    //房间名称楼层等等
}
export interface admin_t {
    id:id_admin_t;
    name: string;
    pass: string
}
export interface config_t {
    webAdmins: Array<admin_t>;
    mcus: Array<mcu_t>;
    ybls: Array<ybl_t>;
}
export const appConfig = {
    // mqttServer_ws_port: 61411,
    // mqttServer_tcp_port: 61412,
    cppServer_ws_port: 61413,
    webAdmin_ws_port: 61414,
    webUser_ws_port: 61415,
    mysql: {
        host: 'localhost', // 数据库主机名
        port: 3306, // 数据库端口号，默认为 3306
        user: 'username', // 数据库用户名
        password: 'password', // 数据库密码
        database: 'mydatabase', // 数据库名称
    }
}