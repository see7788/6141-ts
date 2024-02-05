
import { FC } from 'react'
import { Dropdown, Space, Descriptions } from "antd"
import OnSendTo from "../../public/onSendTo"
import { EditOutlined } from "@ant-design/icons"
import { mcu_baseI18n_t, mcu_baseI18n, mcu_base_t } from "./.t"
const App: FC<{
    config: mcu_base_t;
    i18n?: mcu_baseI18n_t;
    sendTos: string[];
    set: (...op: mcu_base_t) => void;
}> = ({ i18n, config, set, sendTos }) => {
    i18n = i18n || mcu_baseI18n
    return (
        <Descriptions>
            <Descriptions.Item label={i18n[0]}>
                <OnSendTo sendTos={sendTos} vdef={config[0]} vset={v => set(v, config[1], config[2])} />
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