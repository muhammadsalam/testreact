import { createSlice } from '@reduxjs/toolkit'

interface UserState {
    isLoading: boolean,
    isDataGot: boolean,
    isTokenGot: boolean,
}

const initialState: UserState = {
    isLoading: false,
    isDataGot: false,
    isTokenGot: false,
}

export const loading = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setIsDataGot: (state, action) => {
            state.isDataGot = action.payload
        },
        setIsTokenGot: (state, action) => {
            state.isTokenGot = action.payload;
        },
    },
})

export const { setIsLoading, setIsDataGot, setIsTokenGot } = loading.actions

export default loading.reducer