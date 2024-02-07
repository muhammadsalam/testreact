import { configureStore } from '@reduxjs/toolkit'
import pairReducer from 'pages/create-bot/layouts/pair-list/model/pairSlice'
import userReducer from 'shared/API/userSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        pairs: pairReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

