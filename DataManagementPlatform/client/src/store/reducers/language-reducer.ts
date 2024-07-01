// languageSlice.ts

import { createSlice } from '@reduxjs/toolkit'
import { getLanguageConfig } from '../../config/language-config'
import { getLanguage } from '../thunks/language-thunk'

const initialState = {
  language: 'zh',
  texts: getLanguageConfig('zh')
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload
      state.texts = getLanguageConfig(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getLanguage.fulfilled, (state, action) => {
      state.language = action.payload
      state.texts = getLanguageConfig(action.payload)
    })
  }
})

export const { setLanguage } = languageSlice.actions

export default languageSlice.reducer
