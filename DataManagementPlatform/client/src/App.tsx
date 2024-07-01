import './App.css'
import { ConfigProvider, Layout, theme } from 'antd'
import SideBar from './components/layout/side-bar/side-bar.component'
import NavBar from './components/layout/nav-bar/nav-bar.component'
import DataTable from './components/tables/data-table/data-table.component'
import LabelTable from './components/tables/tag-table/tag-table.component'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store/store'
import React, { useEffect } from 'react'
import { getLanguage } from './store/thunks/language-thunk'
import { localeGetLanguage } from './store/thunks/locale-thunk'
import Markdown from './components/markdown/markdown.component'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from './components/error/error-fallback.component'

const { Content } = Layout

function App() {
  const locale = useSelector((state: RootState) => state.locale)
  const dispatch = useDispatch<AppDispatch>()

  const themeSelected = useSelector((state: RootState) => state.theme.theme)

  useEffect(() => {
    // 获取初始 locale 配置
    dispatch(localeGetLanguage())
  }, [dispatch])

  useEffect(() => {
    dispatch(getLanguage())
  }, [dispatch])

  useEffect(() => {
    if (themeSelected === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [themeSelected])

  return (
    <div className="App">
      <ConfigProvider
        locale={locale}
        theme={{
          algorithm:
            themeSelected === 'light'
              ? theme.defaultAlgorithm
              : theme.darkAlgorithm,
          token: {
            colorBgLayout: themeSelected === 'light' ? 'white' : '#010409'
          }
        }}
      >
        <Router>
          <Layout>
            <NavBar />
            <Layout>
              <SideBar />
              <Content>
                <ErrorBoundary
                  FallbackComponent={ErrorFallback}
                  onReset={() => {
                    // 可以在这里执行重置逻辑，比如重置状态等
                  }}
                  onError={(error, info) => {
                    // 可以在这里记录错误日志，比如发送到监控服务
                    console.error('Error caught by ErrorBoundary:', error, info)
                  }}
                >
                  <Routes>
                    <Route path="/" element={<Markdown />}></Route>
                    <Route path="/thoughts" element={<Markdown />}></Route>
                    <Route path="*" element={<Markdown />} />
                    <Route path="/data" element={<DataTable />}></Route>
                    <Route path="/tag" element={<LabelTable />}></Route>
                  </Routes>
                </ErrorBoundary>
              </Content>
            </Layout>
          </Layout>
        </Router>
      </ConfigProvider>
    </div>
  )
}

export default App
