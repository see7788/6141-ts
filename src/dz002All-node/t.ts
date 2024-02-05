
const mqttServer = () => {
    
}
const cpp_wsServer = () => {
    //只允许cpp连接
    //publish("set_macs",stateServer.set_macs())
    //publish("set_ybls",stateServer.set_ybls())
}

const dz002_webAdmin_wsServer = () => {
    //操作state.webAdmin[index].wsId
    //连接时候返回[state,"set_ybls","set_macs"]//页面const [state,....subscribe]=res;
    //操作stateServer.set_macs
    //操作mcu_on_t
}