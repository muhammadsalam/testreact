import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { tgApp } from 'shared/lib';

interface UserState {
    token: string,
    data: {
        user_id: number | null,
        used_balance: number,
        profit: number,
        wallet_id: number | null,
        exchange_type: string | null,
        bots: any[],
    }

}

const initialState: UserState = {
    token: '',
    data: {
        user_id: null,
        used_balance: 0,
        profit: 0,
        wallet_id: null,
        exchange_type: null,
        bots: [],
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
        // user_id: "query_id=AAE8_WdCAgAAADz9Z0J01bpk&user=%7B%22id%22%3A5409078588%2C%22first_name%22%3A%22Muhammadsalam%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22axvai%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1707220442&hash=420a4c01fd88cb136a5a0868a762d819a0986bcde787b51a1a86944e453365fb",
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
        exchangeType: (state, action: PayloadAction<string>) => {
            state.data.exchange_type = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        });
        builder.addCase(fetchMainData.fulfilled, (state, action: PayloadAction<any>) => {
            state.data = action.payload;
        });
    },

})

export const { exchangeType } = userSlice.actions;

export default userSlice.reducer