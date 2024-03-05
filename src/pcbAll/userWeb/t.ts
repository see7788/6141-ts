import { Store_t } from "../t"
export type state_t = Parameters<Store_t["user"]["ws"]["fun"]["send"]>
export interface store_t {
    state: state_t;
    on: (state: state_t) => void
}