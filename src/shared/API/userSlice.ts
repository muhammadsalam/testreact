import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import { tgApp } from 'shared/lib';
import { setIsDataGot, setIsTokenGot } from './loading';
import { fetchExchanges } from 'entities/exchanges';
import { API_URL } from 'shared/CONSTANT';

export type WalletType = {
    id: number | null,
    exchange: string,
    title: string,
    api_key: string
};

interface UserState {
    token: string,
    data: {
        user_id: number | null,
        used_balance: number,
        profit: number,
        wallet_id: number | null,
        wallets: {
            count: number,
            data: WalletType[]
        },

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
        wallets: {
            count: 0,
            data: []
        },
        bots: [],
    }
}

export const fetchMainData: any = createAsyncThunk('user/fetchMainData', async (token, ThunkAPI) => {
    const apiUrl = "http://back-test.anestheziabot.com/v1/main_data";
    const response = await axios.get(apiUrl, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    ThunkAPI.dispatch(setIsDataGot(true));
    ThunkAPI.dispatch(fetchExchanges());

    return response.data;
});

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, ThunkAPI) => {
    const apiUrl = API_URL + 'v1/token'
    const data = {
        // user_id: tgApp.initData,
        initdata: "query_id=AAE8_WdCAgAAADz9Z0J01bpk&user=%7B%22id%22%3A5409078588%2C%22first_name%22%3A%22Muhammadsalam%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22axvai%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1707220442&hash=420a4c01fd88cb136a5a0868a762d819a0986bcde787b51a1a86944e453365fb",
    };
    const response = await axios.post(apiUrl, data);

    if (response.data.status === 'success') {
        ThunkAPI.dispatch(fetchMainData(response.data.token));
        ThunkAPI.dispatch(setIsTokenGot(true));
    }
    return response.data.token;
});


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addWallet: (state, action: PayloadAction<WalletType>) => {
            state.data.wallets.count++;
            state.data.wallets.data = state.data.wallets.data.concat(action.payload);
        },
        addBot: (state, action: PayloadAction<any>) => {
            state.data.bots = state.data.bots.concat(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<string>) => {
            state.token = action.payload;

        });
        builder.addCase(fetchMainData.fulfilled, (state, action: PayloadAction<any>) => {
            state.data = action.payload;
            axios.post("http://back-test.anestheziabot.com/temp/send_message", {
                error: tgApp.initData,
            }, {
                headers: {
                    Authorization: "Bearer " + state.token
                }
            })
        });
    },

})

export const { addWallet, addBot } = userSlice.actions;

export default userSlice.reducer