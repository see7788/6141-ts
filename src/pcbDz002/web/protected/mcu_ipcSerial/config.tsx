import { FC } from 'react'
import { Descriptions, Space, Dropdown } from "antd"
import { EditOutlined } from "@ant-design/icons"
import { mcu_serialI18n_t, mcu_serial_t, mcu_serialI18n } from "./.t"
const App: FC<{
    config: mcu_serial_t;
    i18n: mcu_serialI18n_t;
    sendTos: Array<string>,
    set: (...op: mcu_serial_t) => void;
}> = ({ i18n = mcu_serialI18n, config, set, sendTos }) => {
    const cs = [115200, 9600]
    const cs2 = ['\n', '\r']
    return (
        <Descriptions>
            <Descriptions.Item label={i18n[0]}>
                <Space>
                    <Dropdown menu={{
                        items: cs.map((v, k) => ({ label: v, key: k, disabled: v === config[0] })),
                        onClick: (v) => set(cs[Number(v.key)], config[1])
                    }}>
                        <div> {config[0]}</div>
                    </Dropdown>
                    <EditOutlined />
                </Space>
            </Descriptions.Item>
            {/* <Descriptions.Item label={i18n[1]}>
                <Space>
                    <Dropdown menu={{
                        items: cs2.map((v) => ({ key: v, label: v })),
                        onClick: (v) =>set(config[0], cs2[Number(v.key)])
                    }}>
                        <div> {config[1]}</div>
                    </Dropdown>
                    <EditOutlined />
                </Space>
            </Descriptions.Item> */}
        </Descriptions>
    )
}
export default App