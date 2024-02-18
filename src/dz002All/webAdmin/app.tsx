import { FC } from "react"
import createRoot from "../createApp"
import {appConfig} from "../dz002All-node/protected/t"
const ipc=new WebSocket(`ws://127.0.0.1:${appConfig.cppServer_ws_port}/658444ss`);
ipc.onopen=()=>ipc.send("222")
ipc.onmessage=(msg)=>console.log(msg.data)
const App: FC = () => {
    return <></>
}
export default createRoot(App)