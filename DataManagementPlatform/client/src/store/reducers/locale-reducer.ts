import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import enUS from 'antd/locale/en_US'
import zhCN from 'antd/locale/zh_CN'
import { localeGetLanguage } from '../thunks/locale-thunk'

const initialState: Locale = zhCN // 替换为你的默认 locale

const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<Locale>) {
      return action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(localeGetLanguage.fulfilled, (state, action) => {
      if (action.payload === 'en') {
        return enUS
      } else {
        return zhCN
      }
    })
  }
})

export const { setLocale } = localeSlice.actions
export default localeSlice.reducer
