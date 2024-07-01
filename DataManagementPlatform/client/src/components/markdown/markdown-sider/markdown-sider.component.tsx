import React from 'react'
import MarkNav from 'markdown-navbar'
import style from './markdown-sider.module.css'
import './markdown-sider-common.css'

import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'

export default function MarkdownSider({ mdContent }: { mdContent: string }) {
  const themeSelected = useSelector((state: RootState) => state.theme.theme)

  return (
    <>
      {themeSelected === 'light' ? (
        <link rel="stylesheet" type="text/css" href="./markdown-sider.css" />
      ) : (
        <link
          rel="stylesheet"
          type="text/css"
          href="./markdown-sider-dark.css"
        />
      )}
      <MarkNav
        className={style['markdown-sider']}
        source={mdContent}
        headingTopOffset={40} //离顶部的距离
        ordered={false} //是否显示标题题号1,2等
        updateHashAuto={false}
      />
    </>
  )
}
