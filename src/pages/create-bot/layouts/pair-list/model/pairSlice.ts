import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { Pair } from '..';

const initialState: {
    list: Pair[]
} = {
    list: []
}

export const fetchPairs = createAsyncThunk('pairs/FetchPairs', async () => {
    const apiUrl = "https://back.anestheziabot.tra.infope9l.beget.tech/v1/get_pair";
    const response = await axios.get(apiUrl);
    return response.data;
});

export const pairSlice = createSlice({
    name: 'pairs',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPairs.fulfilled, (state, action: PayloadAction<Pair[]>) => {
            state.list = action.payload;
        });
    },

})

export default pairSlice.reducer