import { FC } from 'react'
import { Dropdown, Space } from "antd"
import { EditOutlined } from "@ant-design/icons"
const App: FC<{ sendTos: Array<string>, vdef: string, vset: (v: string) => void }> = ({ sendTos, vdef, vset }) => {
    return (
        <Space>
            <Dropdown menu={{
                items: sendTos.map((v, k) => ({ label: v, key: k })),
                onClick: ({ key }) => vset(sendTos[key as any])
            }}>
                <div> {vdef}</div>
            </Dropdown>
            <EditOutlined />
        </Space>
    )
}
export default App