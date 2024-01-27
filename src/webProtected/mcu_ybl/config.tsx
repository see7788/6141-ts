import { FC } from 'react'
import _ from "lodash"
import {
    Descriptions,
    InputNumber,
    Space,
    Popover,
    Avatar,
    Badge,
} from "antd"
import Hover from "@public/HoverEdit"
import OnSendTo from "../onSendTo"
import { DeleteOutlined } from '@ant-design/icons';
import { mcu_ybl_t, mcu_yblI18n_t, mcu_ybl_idInfo_t } from "./.t"
const App: FC<{
    config: mcu_ybl_t;
    sendTos: Array<string>,
    i18n: mcu_yblI18n_t;
    set: (...op: mcu_ybl_t) => void;
}> = ({ i18n, config, set, sendTos }) => {
    const getState = (c: mcu_ybl_idInfo_t) => {
        return c.state === 8 ? true : false
    }
    const c = config && config[1] ? Object.entries(config[1]) : [];
    return (
        <Descriptions>
            <Descriptions.Item label={i18n[0]}>
                {/* <OnSendTo
                    sendTos={sendTos}
                    vdef={config[0]}
                    vset={v => set(v as any, config[1], config[2], config[3])}
                /> */}
                <></>
            </Descriptions.Item>
            <Descriptions.Item label={i18n[1]}>
                <Space >
                    {c.map(([id, info], i) => {
                        const style = { backgroundColor: getState(info) ? '#FF3366' : "#33CC33" }
                        return (
                            <Badge key={i} style={style} count={i + 1} >
                                <Popover content={<DeleteOutlined onClick={() => {
                                    const c = Object.fromEntries(Object.entries(config[1]).filter(kv => kv[0] != id))
                                    set(config[0], c, config[2], config[3])
                                }} />} >
                                    <Avatar shape="square" style={style} size={64}>{id}</Avatar >
                                </Popover>
                            </Badge>
                        )
                    })}
                </Space>
            </Descriptions.Item>
            <Descriptions.Item label={i18n[2]}>
                <Hover value={config[2]} jsx={
                    <InputNumber
                        size="small"
                        value={config[2]}
                        bordered={false}
                        status="error"
                        onChange={v => set(config[0], config[1], v || 300, config[3])}
                        step={300}
                        min={300}
                    />
                } />
            </Descriptions.Item>
            <Descriptions.Item label={i18n[3]}>
                <Hover value={config[3]} jsx={
                    <InputNumber
                        size="small"
                        value={config[3]}
                        bordered={false}
                        status="error"
                        onChange={v => set(config[0], config[1], config[2], v || 3000)}
                        step={100}
                        min={3000}
                    />
                } />
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App