import createRoot from "../createApp"
import png from "./c.png"
import ReactImgEditor from 'react-img-editor'
import 'react-img-editor/assets/index.css'
//http://fabricjs.com/  
const App=()=>{
    return <ReactImgEditor src={png}/>
}
export default createRoot(App)