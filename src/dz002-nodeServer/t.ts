import { mcu_ybldatas_t } from "../dz002-cppWeb/protected/mcu_ybl/.t"
namespace from_cpp {
    export type connect = (...op: ["connect"]) => true

}
namespace from_cppWeb {
    export type connect = (...op: ["connect"]) => mcu_ybldatas_t

}
namespace from_nodeWeb {
    export type connect = (...op: ["connect"]) => mcu_ybldatas_t

}
namespace from_nodeWebAdmin {
    export type connect = (...op: ["connect"]) => mcu_ybldatas_t

}