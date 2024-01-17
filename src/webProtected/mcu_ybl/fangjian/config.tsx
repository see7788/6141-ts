import React, { FC } from 'react'
import { EditOutlined } from "@ant-design/icons"
import { gender_t, mcu_fangjian_t, mcu_fangjianI18n_t } from "./.t"
import { Input, Descriptions, Segmented, InputNumber } from "antd"
const App: FC<{
    config: mcu_fangjian_t;
    i18n: mcu_fangjianI18n_t;
    set: (...op: mcu_fangjian_t) => void;
}> = ({ i18n, config, set }) => (
    <Descriptions>
        <Descriptions.Item label={i18n[0]}>
            <Segmented
                value={config[0]}
                options={['girl', 'boy']}
                onChange={v => set(v as any, config[1], config[2])}
            />
        </Descriptions.Item>
        <Descriptions.Item label={i18n[1]}>
            <Segmented
                value={config[1]}
                options={Array.from(new Array(9), (c, i) => ++i)}
                onChange={v => set(config[0], v as any, config[2])}
            />
        </Descriptions.Item>
        <Descriptions.Item label={i18n[0]}>
            <Input
                defaultValue={config[2].replace(/\s*/g, "") || `${config[2]}`}
                onChange={v => set(config[0], config[1], v as any)}
                suffix={<EditOutlined />}
                bordered={false}
            />
        </Descriptions.Item>
    </Descriptions>
)
export default App