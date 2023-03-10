import {configureStore} from '@reduxjs/toolkit'
import {githubApi} from './github/github.api'
import {setupListeners} from '@reduxjs/toolkit/query'
import {githubReducer} from './github/github.slice'

export const store = configureStore({
  reducer: {
//to link githubApi to store
//key 'githubApi' (that is indicated om reducerPath of githubApi)
    [githubApi.reducerPath]: githubApi.reducer,
//registering reducer in store 
    github: githubReducer
  },
// middleware receives method getDefaultMiddleware and returns some concatination
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(githubApi.middleware)
})

setupListeners(store.dispatch)

// for correct typisation we need to export special custom type
//to know with what type we work in store
export type RootState = ReturnType<typeof store.getState>