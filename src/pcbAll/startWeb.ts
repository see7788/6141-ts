import config from "../config"
import { Store_t } from "./t"
import cp from "child_process"
function webCreate(sname: keyof Pick<Store_t, "pcbDz002" | "admins" | "visitor">) {
    const c = config[sname].web
    const port = Number(c.uri.split(":")[2])
    const cmd = sname === "pcbDz002"
        ? `pcbDz002/web --port ${port}`
        : `pcbAll/${sname}Web --port ${port}`
    cp.exec(`pnpm run web --mode  ${cmd}`)
        .stdout
        ?.on('data', log => console.log(
            `${sname}.web.port ${port} ${c.name} start `, log
        ))
}
webCreate("pcbDz002")
webCreate("admins")
webCreate("visitor")