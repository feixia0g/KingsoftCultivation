import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd'
import { BarChartOutlined, ReadOutlined, TagsOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { RootState } from '../../../store/store'
import { useSelector } from 'react-redux'

const { Sider } = Layout

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false)

  const themeSelected = useSelector((state: RootState) => state.theme.theme)
  const themeStr = themeSelected === 'light' ? 'light' : 'dark'

  const texts = useSelector((state: RootState) => state.language.texts)

  const items: MenuItem[] = [
    {
      key: '1',
      icon: <ReadOutlined />,
      label: <Link to="/thoughts">{texts.sidebar.thoughtsTable}</Link>
    },
    {
      key: '2',
      icon: <BarChartOutlined />,
      label: <Link to="/data">{texts.sidebar.dataTable}</Link>
    },
    {
      key: '3',
      icon: <TagsOutlined />,
      label: <Link to="/tag">{texts.sidebar.tagsTable}</Link>
    }
  ]

  const [selectedKey, setSelectedKey] = useState('1')

  useEffect(() => {
    // 从 localStorage 获取上次选中的菜单项
    const savedKey = localStorage.getItem('selectedKey')
    if (savedKey) {
      setSelectedKey(savedKey)
    }
  }, [])

  const handleMenuClick = (e: { key: React.SetStateAction<string> }) => {
    // 保存选中的菜单项到 localStorage
    setSelectedKey(e.key)
    localStorage.setItem('selectedKey', String(e.key))
  }

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{ height: '115vh' }}
      theme={themeStr}
    >
      <Menu
        theme={themeStr}
        mode="vertical"
        selectedKeys={[selectedKey]} // 设置选中的菜单项
        onClick={handleMenuClick} // 处理菜单项点击事件
        items={items}
      ></Menu>
    </Sider>
  )
}
