
import { FC } from 'react'
import { Dropdown, Space, Descriptions } from "antd"
import OnSendTo from "../../public/onSendTo"
import { EditOutlined } from "@ant-design/icons"
import { mcu_baseConfigI18n_t, mcu_baseConfigI18n, mcu_baseConfig_t } from "./.t"
const App: FC<{
    config: mcu_baseConfig_t;
    i18n?: mcu_baseConfigI18n_t;
    sendTos: string[];
    set: (...op: mcu_baseConfig_t) => void;
}> = ({ i18n, config, set, sendTos }) => {
    i18n = i18n || mcu_baseConfigI18n
    return (
        <Descriptions>
            <Descriptions.Item label={i18n[0]}>
                <OnSendTo sendTos={sendTos} vdef={config[0]} vset={v => set(v,config[1],config[2])} />
            </Descriptions.Item>
            <Descriptions.Item label={i18n[1]}>
                {config[1]}
            </Descriptions.Item>
            <Descriptions.Item label={i18n[2]} >
                {config[2]}
            </Descriptions.Item>
        </Descriptions>
    )
}

export default App