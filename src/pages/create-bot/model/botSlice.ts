import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/AppStore';
import axios, { AxiosError } from 'axios';
import { addAlert } from 'entities/notification';
import { addBot } from 'shared/API/userSlice';
import { Pair } from '../layouts';

type ErrorType = {
    status: string
    key?: string;
    detail: string;
};

interface Take {
    step: string;
    amount: string;
}

export interface BotModel {
    user_id: number | null;
    wallet_id: number | null;
    title: string;
    pair: Pair | null;
    strategy: string;
    entry_type: {
        title: string,
        id: "BUY_COIN" | "USE_WALLET" | "BY_INDICATOR",
        disabled?: boolean,
    };
    amount_first_order: string;
    type_first_order: string;
    price_first_order: string;
    def_type: {
        title: string;
        id: 'IO' | 'SL' | "NONE";
    };
    io_calculate_type: string;
    io_count: string;
    io_step: string;
    io_mrt: string;
    io_step_mrt: string;
    stop_loss: string;
    take_type: "MANUAL" | "AUTO" | "BY_INDICATOR" | "NONE";
    take_profit: string;
    take_amount_limit: string;
    take_amount: string;
    take_step: string;
    take_mrt: string;
    existing_volume: string;
    purchase_price: string;
    takes: Take[];
    cycles: {
        count: number;
        input_type: 'FIXED' | 'CORRECTION' | 'BY_INDICATOR';
        fixed_price: string;
        correction: string;
        amount_type: 'FIXED' | 'ALL_PROFIT' | 'LAST_PROFIT';
        fixed_amount: string;
    };
    otherStates: {
        def_mrt: boolean;
        def_step_mrt: boolean;
        take_step: boolean;
        take_mrt: boolean;
        cycles: boolean;
        orders_error?: {
            message: string;
            mainButtonText: string;
        } | string;
    };
    orders: {
        pair: string;
        amount_input: number;
        status:
        | "READY_TO_PLACED"
        | "CREATED"
        | "CANCELED"
        | "POSTED"
        | "READY_TO_CANCEL"
        | "READY_TO_REPLACE"
        | "WAIT"
        | "EXECUTED";
        order_type: 'LIMIT' | 'MARKET' | 'TAKE_PROFIT' | 'STOP_LOSS';
        id: number;
        price: number;
        bot_id: number;
        amount_output: number;
        type: 'FIRST_ORDER' | 'IO_ORDER' | 'TAKE_PROFIT' | 'STOP_LOSS';
        cycle: number;
    }[] | null;
}

const savedState = localStorage.getItem('newBot');
const stateIfNoSaved: BotModel = {
    orders: null,
    user_id: null,
    wallet_id: null,
    title: "",
    pair: null,
    strategy: "LONG",
    entry_type: {
        title: "Buying a coin",
        id: "BUY_COIN",
    },
    amount_first_order: "",
    type_first_order: "LIMIT",
    price_first_order: "",
    def_type: {
        title: "Insurance orders",
        id: "IO",
    },
    io_calculate_type: "LO",
    io_count: "",
    io_step: "",
    io_mrt: "1",
    io_step_mrt: "1",
    stop_loss: "",
    existing_volume: "",
    purchase_price: "",
    take_type: "MANUAL",
    take_profit: "",
    take_amount_limit: "100",
    take_amount: "",
    take_step: "1",
    take_mrt: "1",
    takes: [
        {
            step: "",
            amount: "",
        },
    ],
    cycles: {
        count: 1,
        input_type: "FIXED",
        fixed_price: '',
        correction: '',
        amount_type: "FIXED",
        fixed_amount: '',

    },
    otherStates: {
        def_mrt: false,
        def_step_mrt: false,
        take_step: false,
        take_mrt: false,
        cycles: false,
    }
}
const preloadedState: BotModel = savedState ? JSON.parse(savedState) : stateIfNoSaved;
const initialState: BotModel = preloadedState;

type FieldValue<T extends keyof BotModel> = {
    field: T;
    value: BotModel[T];
};

export const createBot = createAsyncThunk('user/createBot', async ({ preCosting = false, token }: { preCosting?: boolean; token: string }, ThunkAPI) => {
    const state = (ThunkAPI.getState() as RootState).newBot;
    const bot = {
        user_id: state.user_id,
        wallet_id: state.wallet_id,
        existing_volume: +state.existing_volume,
        purchase_price: +state.purchase_price,
        title: state.title,
        pair: state.pair?.id,
        strategy: state.strategy,
        entry_type: state.entry_type.id,
        amount_first_order: +state.amount_first_order,
        type_first_order: state.type_first_order,
        price_first_order: +state.price_first_order,
        def_type: state.def_type.id,
        io_calculate_type: state.io_calculate_type,
        io_count: +state.io_count,
        io_step: +state.io_step,
        io_mrt: +state.io_mrt,
        io_step_mrt: +state.io_step_mrt,
        stop_loss: +state.stop_loss,
        take_type: state.take_type,
        take_profit: +state.take_profit,
        take_amount_limit: +state.take_amount_limit,
        take_amount: +state.take_amount,
        take_step: +state.take_step,
        take_mrt: +state.take_mrt,
        takes: state.takes.map((take) => {
            return {
                step: +take.step,
                amount: +take.amount,
            }
        }),
        cycles: {
            count: state.cycles.count,
            input_type: state.cycles.input_type,
            fixed_price: +state.cycles.fixed_price,
            correction: +state.cycles.correction,
            amount_type: state.cycles.amount_type,
            fixed_amount: +state.cycles.fixed_amount,
        },

    }

    const config = {
        headers: { Authorization: "Bearer " + token }
    };

    axios.post('http://back-test.anestheziabot.com/v1/create_bot?preCosting=' + preCosting, bot, config).then((res) => res.data)
        .then(data => {
            console.log('data', data);
            if (preCosting) ThunkAPI.dispatch(setField({ field: 'orders', value: data.orders }));
            if (!preCosting && data.status === 'success') ThunkAPI.dispatch(addBot(data.bot));
        })
        .catch((error: AxiosError) => {
            console.log('error', error);

            if (error.response) {
                const responseData = (error.response?.data as ErrorType);
                if (preCosting) ThunkAPI.dispatch(setField({ field: 'otherStates', value: { ...state.otherStates, orders_error: responseData?.detail } }));
                else ThunkAPI.dispatch(addAlert({ title: responseData?.detail }))

            } else {
                ThunkAPI.dispatch(setField({
                    field: 'otherStates', value: {
                        ...state.otherStates, orders_error: {
                            message: error.message,
                            mainButtonText: 'Try again'
                        }
                    }
                }))
            }
        });
});

export const botSlice = createSlice({
    name: 'newBot',
    initialState,
    reducers: {
        setField: <T extends keyof BotModel>(state: BotModel, action: PayloadAction<FieldValue<T>>) => {
            state[action.payload.field] = action.payload.value;
            localStorage.setItem('newBot', JSON.stringify(state));
        },
        resetBot: () => {
            localStorage.removeItem('newBot');
            return stateIfNoSaved;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setField, resetBot } = botSlice.actions

export default botSlice.reducer