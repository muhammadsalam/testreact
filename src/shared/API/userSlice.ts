import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { tgApp } from 'shared/lib';

const initialState = {
    token: '',
    data: {

    }
}

export const fetchMainData: any = createAsyncThunk('user/fetchMainData', async (token) => {
    const apiUrl = "https://back.anestheziabot.tra.infope9l.beget.tech/v1/main_data";
    const response = await axios.get(apiUrl, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    return response.data;
});

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, ThunkAPI) => {
    const apiUrl = "https://back.anestheziabot.tra.infope9l.beget.tech/v1/token";
    const data = {
        user_id: tgApp.initData,
    };
    const response = await axios.post(apiUrl, data);

    if (response.data.status === 'success') {
        ThunkAPI.dispatch(fetchMainData(response.data.token));
    }
    return response.data.token;
});


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        });
        builder.addCase(fetchMainData.fulfilled, (state, action: PayloadAction<any>) => {
            state.data = action.payload.data;
        });
    },

})

export default userSlice.reducer