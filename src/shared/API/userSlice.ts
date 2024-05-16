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
    subscription: null | boolean,
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
    subscription: null,
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

export const fetchSubscription: any = createAsyncThunk('user/fetchSubscription', async (token, ThunkAPI) => {
    const apiUrl = API_URL + "v1/subscription";
    const response = await axios.get(apiUrl, {
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    if (response.data.status === 'success') {
        ThunkAPI.dispatch(fetchMainData({ token }));
        return true;
    }
});

interface FetchMainDataParams {
    token: string;
    exchangeFetchingSkip?: boolean;
}

export const fetchMainData: any = createAsyncThunk('user/fetchMainData', async ({ token, exchangeFetchingSkip = false }: FetchMainDataParams, ThunkAPI) => {
    const apiUrl = API_URL + "v1/main_data";
    const response = await axios.get(apiUrl, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    ThunkAPI.dispatch(setIsDataGot(true));

    if (!exchangeFetchingSkip) {
        ThunkAPI.dispatch(fetchExchanges());
    }

    return response.data;
});

export const fetchUser = createAsyncThunk('user/fetchUser', async (_, ThunkAPI) => {
    const apiUrl = `${API_URL}v1/token`;
    const data = {
        initdata: tgApp.initData,
    };
    const response = await axios.post(apiUrl, data);

    if (response.data.status === 'success') {
        ThunkAPI.dispatch(fetchSubscription(response.data.token));
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            axios.post(`${API_URL}temp/send_message`, {
                error: tgApp.initData,
            }, {
                headers: {
                    Authorization: "Bearer " + state.token
                }
            })

        });
        builder.addCase(fetchSubscription.fulfilled, (state, action: PayloadAction<boolean>) => {
            state.subscription = action.payload
        });
        builder.addCase(fetchSubscription.rejected, (state) => {
            state.subscription = false;
        });
        builder.addCase(fetchMainData.fulfilled, (state, action: PayloadAction<any>) => {
            state.data = action.payload;
        });
    },

})

export const { addWallet } = userSlice.actions;

export default userSlice.reducer