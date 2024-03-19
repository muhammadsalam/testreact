import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { Pair } from '..';
import { RootState } from 'app/AppStore';
import { setField } from 'pages/create-bot';

const initialState: Pair[] = [];

export const pairFieldsReset = createAsyncThunk('pairs/reset', async (_, ThunkAPI) => {
    const cycles = (ThunkAPI.getState() as RootState).newBot.cycles;

    ThunkAPI.dispatch(setField({ field: "price_first_order", value: "" }));
    ThunkAPI.dispatch(setField({ field: "purchase_price", value: "" }));
    ThunkAPI.dispatch(
        setField({
            field: "cycles",
            value: { ...cycles, fixed_price: "" },
        })
    );
});

export const fetchPairs = createAsyncThunk('pairs/FetchPairs', async (value: string | undefined, ThunkAPI) => {
    const wallet_id = (ThunkAPI.getState() as RootState).newBot.wallet_id;
    const apiUrl = `https://back.anestheziabot.tra.infope9l.beget.tech/v1/get_pair?wallet_id=${wallet_id}${value !== undefined && value !== '' ? `&pair=${value}` : ''}`;
    const response = await axios.get(apiUrl);
    return response.data;
});

export const pairSlice = createSlice({
    name: 'exchanges',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPairs.fulfilled, (_, action: PayloadAction<Pair[]>) => {
            return action.payload;
        });
    },

})

export default pairSlice.reducer