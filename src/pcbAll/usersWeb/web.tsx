import createRoot from "../../createApp"
import store from "./store"
const App=()=>{
    const data=store(s=>s)
    return <>{JSON.stringify(data)}</>
}
export default createRoot(App)