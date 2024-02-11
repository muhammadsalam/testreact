import { configureStore } from '@reduxjs/toolkit'
import pairReducer from 'pages/create-bot/layouts/pair-list/model/pairSlice'
import userReducer from 'shared/API/userSlice'
import newBotReducer from 'pages/create-bot/model/botSlice';
import alertReducer from 'entities/notification/model/alertSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        pairs: pairReducer,
        newBot: newBotReducer,
        alert: alertReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

