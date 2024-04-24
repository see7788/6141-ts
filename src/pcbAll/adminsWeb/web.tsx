import createRoot from "../../createApp"
import store from "./store"
const App=()=>{
    const data=store(s=>s)
    return <>{JSON.stringify(data)}</>
}
// console.log('import.meta.env.VITE_APP_TITLE ',  import.meta.env.VITE_APP_TITLE);
export default createRoot(App)