import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface Pair {
    id: string;
    base: string;
    quote: string;
    baseimg: string;
    quoteimg: string;
}

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
        id: "BUYING_COIN" | "COINS_FROM_WALLET" | "BY_INDICATOR",
        disabled?: boolean,
    };
    ammount_first_order: string;
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
        amount_type: 'FIXED' | 'DYNAMIC';
        fixed_amount: string;
        dynamic_amount: string;
    };
    otherStates: {
        def_mrt: boolean;
        def_step_mrt: boolean;
        take_step: boolean;
        take_mrt: boolean;
        cycles: boolean;
    };
}

const initialState: BotModel = {
    user_id: null,
    wallet_id: null,
    title: "",
    pair: null,
    strategy: "LONG",
    entry_type: {
        title: "Buying a coin",
        id: "BUYING_COIN",
    },
    ammount_first_order: "",
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
        count: 0,
        input_type: "FIXED",
        fixed_price: '',
        correction: '',
        amount_type: "DYNAMIC",
        fixed_amount: '',
        dynamic_amount: '',

    },
    otherStates: {
        def_mrt: false,
        def_step_mrt: false,
        take_step: false,
        take_mrt: false,
        cycles: false,
    }
}

type FieldValue<T extends keyof BotModel> = {
    field: T;
    value: BotModel[T];
};

export const botSlice = createSlice({
    name: 'newBot',
    initialState,
    reducers: {
        setField: <T extends keyof BotModel>(state: BotModel, action: PayloadAction<FieldValue<T>>) => {
            state[action.payload.field] = action.payload.value;
        },
        resetBot: () => initialState
    },
})

// Action creators are generated for each case reducer function
export const { setField, resetBot } = botSlice.actions

export default botSlice.reducer