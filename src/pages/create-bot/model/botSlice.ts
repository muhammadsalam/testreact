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
    user_id: number;
    wallet_id: number;
    title: string;
    pair: Pair;
    strategy: string;
    active_buy: boolean;
    ammount_first_order: string;
    type_first_order: string;
    price_first_order: string;
    active_def: boolean;
    def_type: "IO" | "SL";
    io_calculate_type: string;
    io_count: string;
    io_step: string;
    io_mrt: string;
    io_step_mrt: string;
    stop_loss: string;
    active_tp: boolean;
    take_type: "MANUAL" | "AUTO";
    take_profit: string;
    take_amount: string;
    take_step: string;
    take_mrt: string;
    existing_volume: string;
    purchase_price: string;
    takes: Take[];
    cycles: number;
}

const initialState: BotModel = {
    user_id: 19,
    wallet_id: 8,
    title: "",
    pair: {
        id: "ETHUSDT",
        base: "ETH",
        baseimg:
            "https://back.anestheziabot.tra.infope9l.beget.tech/pair/btc.svg",
        quote: "USDT",
        quoteimg:
            "https://back.anestheziabot.tra.infope9l.beget.tech/pair/usdt.svg",
    },
    strategy: "LONG",
    active_buy: true,
    ammount_first_order: "",
    type_first_order: "LIMIT",
    price_first_order: "",
    active_def: true,
    def_type: "IO",
    io_calculate_type: "LO",
    io_count: "",
    io_step: "",
    io_mrt: "1",
    io_step_mrt: "1",
    stop_loss: "",
    active_tp: true,
    take_type: "MANUAL",
    existing_volume: "",
    purchase_price: "",
    take_profit: "",
    take_amount: "",
    take_step: "1",
    take_mrt: "1",
    takes: [
        {
            step: "",
            amount: "",
        },
    ],
    cycles: 1,
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
        }
    },
})

// Action creators are generated for each case reducer function
export const { setField } = botSlice.actions

export default botSlice.reducer