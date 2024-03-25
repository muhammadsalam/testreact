import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { API_URL } from 'shared/CONSTANT';

export type ExchangeType = {
    id: number;
    title: string;
    exchange: string;
} | null

const initialState: ExchangeType[] = [];

export const fetchExchanges = createAsyncThunk('exchanges/fetchExchanges', async () => {
    const apiUrl = API_URL + `/v1/exchanges`;
    const response = await axios.get(apiUrl);
    return response.data;
});

export const exchangeSlice = createSlice({
    name: 'exchanges',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchExchanges.fulfilled, (_, action: PayloadAction<ExchangeType[]>) => {
            return action.payload;
        });
    },

})

export default exchangeSlice.reducer