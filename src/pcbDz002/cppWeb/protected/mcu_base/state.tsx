import { FC } from 'react'
import { Descriptions } from "antd"
import { mcu_state_t, mcu_stateI18n_t, mcu_stateI18n } from "./.t"
const App: FC<{
    config: mcu_state_t;
    i18n?: mcu_stateI18n_t;
}> = ({ i18n, config }) => {
    i18n = i18n || mcu_stateI18n;
    const info = config.map((v, i) => {
       return <Descriptions.Item label={i18n[i]}>
            {i===1?JSON.stringify(config[i]):config[i]}
        </Descriptions.Item>
    })
    return  <Descriptions>{...info}</Descriptions>
}
export default App