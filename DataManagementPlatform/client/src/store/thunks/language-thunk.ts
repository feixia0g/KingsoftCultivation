import { createAsyncThunk } from '@reduxjs/toolkit'
import { getLang, setLang } from '../../api/service/language-service'
import { setLanguage } from '../reducers/language-reducer'

export const getLanguage = createAsyncThunk(
  'language/getLanguage',
  async () => {
    const response = await getLang()
    return response.data
  }
)

export const setLanguageAsync = createAsyncThunk(
  'language/setLanguage',
  async (language: string, { dispatch }) => {
    const response = await setLang(language)
    // 更新 Redux store 中的语言
    dispatch(setLanguage(language))

    // 重新获取新的语言配置
    dispatch(getLanguage())
    return response.data
  }
)
