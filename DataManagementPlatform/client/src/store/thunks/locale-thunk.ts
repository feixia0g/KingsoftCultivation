import { createAsyncThunk } from '@reduxjs/toolkit'
import { getLang } from '../../api/service/language-service'

export const localeGetLanguage = createAsyncThunk(
  'language/localeGetLanguage',
  async () => {
    const response = await getLang()
    return response.data
  }
)
