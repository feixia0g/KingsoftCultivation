import React, { useEffect, useState } from 'react'
import { Layout, Popover, Switch } from 'antd'
import style from './nav-bar.module.css'
import { MoonOutlined, SettingOutlined, SunOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store/store'
import { setLocale } from '../../../store/reducers/locale-reducer'
import 'dayjs/locale/zh-cn'

import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import { setLanguageAsync } from '../../../store/thunks/language-thunk'
import { setTheme } from '../../../store/reducers/theme-reducer'

const { Header } = Layout

export default function NavBar() {
  const [showSwitch, setShowSwitch] = useState(false)

  const language = useSelector((state: RootState) => state.language.language)
  const texts = useSelector((state: RootState) => state.language.texts)

  const localeDispatch = useDispatch()
  const dispatch = useDispatch<AppDispatch>()
  const themeSelected = useSelector((state: RootState) => state.theme.theme)

  const headerStyle = {
    backgroundColor: themeSelected === 'light' ? '#f6f8fa' : '#001529',
    color: themeSelected === 'light' ? 'rgba(0, 0, 0, 0.88)' : '#ffffff'
  }

  useEffect(() => {
    language === 'en' ? dayjs.locale('en') : dayjs.locale('zh-cn')
    const newLocale: Locale = language === 'en' ? enUS : zhCN
    localeDispatch(setLocale(newLocale))
  }, [language, localeDispatch])

  const handleLanguageChange = () => {
    const changeLanguage: string = language === 'en' ? 'zh' : 'en'

    dispatch(setLanguageAsync(changeLanguage))
    language === 'en' ? dayjs.locale('en') : dayjs.locale('zh-cn')
  }

  const toggleSwitch = () => {
    setShowSwitch(!showSwitch)
  }

  const themeChange = () => {
    const changeTheme: string = themeSelected === 'light' ? 'dark' : 'light'
    dispatch(setTheme(changeTheme))
  }

  const switchContent = (
    <Switch
      checkedChildren={texts.settings.checkedLanguage}
      unCheckedChildren={texts.settings.unCheckedLanguage}
      defaultChecked
      className={style['setting-switch']}
      onClick={handleLanguageChange}
    />
  )

  return (
    <Header className={`${style['nav-bar']}`} style={headerStyle}>
      <div className={style['left-content']}>
        <p>{texts.navbar.title}</p>
      </div>
      <div className={style['right-content']}>
        <div className="theme">
          <button onClick={themeChange}>
            {themeSelected === 'light' ? (
              <SunOutlined className={style['mode-icon']} />
            ) : (
              <MoonOutlined className={style['mode-icon']} />
            )}
          </button>
        </div>
        <div className="setting">
          <Popover
            content={switchContent}
            trigger="hover"
            arrow={false}
            overlayStyle={{ top: 50, width: 100 }}
          >
            <button className={style['setting-btn']} onClick={toggleSwitch}>
              <SettingOutlined />
              <p>{texts.navbar.settings}</p>
            </button>
          </Popover>
        </div>
      </div>
    </Header>
  )
}
