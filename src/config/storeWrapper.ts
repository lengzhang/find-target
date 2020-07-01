import { MakeStore, createWrapper, Context } from 'next-redux-wrapper'

import configureStore from './store'
import { RootState } from '../reducer'

export const makeStore: MakeStore<RootState> = (context: Context) => {
  return configureStore()
}

export const wrapper = createWrapper<RootState>(makeStore, {
  debug: process.env.NODE_ENV !== 'production',
})
