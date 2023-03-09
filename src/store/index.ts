import {configureStore} from '@reduxjs/toolkit'
import {githubApi} from './github/github.api'
import {setupListeners} from '@reduxjs/toolkit/query'
import {githubReducer} from './github/github.slice'

export const store = configureStore({
  reducer: {
//to link githubApi to store
//key 'githubApi' (that is indicated om reducerPath of githubApi)
    [githubApi.reducerPath]: githubApi.reducer,
    github: githubReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(githubApi.middleware)
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>