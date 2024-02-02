
import { FC } from 'react'
import { Input, Descriptions } from "antd"
import OnSendTo from "../onSendTo"
import HoverEdit from "@uipublic/HoverEdit"
import { mcu_wsServer_t, mcu_wsServerI18n_t } from "./.t"
const App: FC<{
    config: mcu_wsServer_t;
    sendTos: Array<string>,
    i18n: mcu_wsServerI18n_t;
    set: (...op: mcu_wsServer_t) => void;
}> = ({ i18n, config, sendTos, set }) => {
    return (
        <Descriptions>
            <Descriptions.Item label={i18n[0]} >
                <HoverEdit value={config[0]} jsx={
                    <Input
                        value={config[0]}
                        bordered={false}
                        onChange={v => set(v.currentTarget.value)}
                    />
                } />
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App