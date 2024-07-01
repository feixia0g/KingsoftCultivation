import { configureStore } from '@reduxjs/toolkit'
import languageReducer from './reducers/language-reducer'
import localeReducer from './reducers/locale-reducer'
import themeReducer from './reducers/theme-reducer'

export const store = configureStore({
  reducer: {
    language: languageReducer,
    locale: localeReducer,
    theme: themeReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
