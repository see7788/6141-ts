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
import Hover from "@uipublic/HoverEdit"
import { DeleteOutlined } from '@ant-design/icons';
import { mcu_ybl_t, mcu_yblI18n_t, mcu_ybl_idInfo_t } from "./.t"
const App: FC<{
    config: mcu_ybl_t;
    i18n: mcu_yblI18n_t;
    set: (...op: mcu_ybl_t) => void;
}> = ({ i18n, config, set }) => {
    const getState = (c: mcu_ybl_idInfo_t) => {
        return c.state === 8 ? true : false
    }
    return (
        <Descriptions>
            <Descriptions.Item label={i18n[0]}>
                <Space >
                    {Object.entries(config[0]).map(([id, info], i) => {
                        const style = { backgroundColor: getState(info) ? '#FF3366' : "#33CC33" }
                        return (
                            <Badge key={i} style={style} count={i + 1} >
                                <Popover content={<DeleteOutlined onClick={() => {
                                    const c = Object.fromEntries(Object.entries(config[0]).filter(kv => kv[0] != id))
                                    set(c, config[1], config[2])
                                }} />} >
                                    <Avatar shape="square" style={style} size={64}>{id}</Avatar >
                                </Popover>
                            </Badge>
                        )
                    })}
                </Space>
            </Descriptions.Item>
            <Descriptions.Item label={i18n[1]}>
                <Hover value={config[1]} jsx={
                    <InputNumber
                        size="small"
                        value={config[1]}
                        bordered={false}
                        status="error"
                        onChange={v => set(config[0],  v || 300, config[2])}
                        step={300}
                        min={300}
                    />
                } />
            </Descriptions.Item>
            <Descriptions.Item label={i18n[2]}>
                <Hover value={config[2]} jsx={
                    <InputNumber
                        size="small"
                        value={config[2]}
                        bordered={false}
                        status="error"
                        onChange={v => set(config[0], config[1],  v || 3000)}
                        step={100}
                        min={3000}
                    />
                } />
            </Descriptions.Item>
        </Descriptions>
    )
}
export default App