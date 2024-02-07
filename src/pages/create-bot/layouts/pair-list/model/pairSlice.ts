import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { Pair } from '..';

const initialState = {
    list: [],
    activePair: {
        id: "ETHUSDT",
        base: "ETH",
        baseimg:
            "https://back.anestheziabot.tra.infope9l.beget.tech/pair/btc.svg",
        quote: "USDT",
        quoteimg:
            "https://back.anestheziabot.tra.infope9l.beget.tech/pair/usdt.svg",
    },
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
        setActive: (state, action: PayloadAction<Pair>) => {
            state.activePair = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPairs.fulfilled, (state, action: PayloadAction<any>) => {
            state.list = action.payload;
        });
    },

})

export const { setActive } = pairSlice.actions;

export default pairSlice.reducer