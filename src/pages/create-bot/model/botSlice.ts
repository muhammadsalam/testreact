import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface BotModel {
    user_id: number;
    wallet_id: number;
    title: string;
    pair: string;
    strategy: string;
    active_buy: boolean;
    ammount_first_order: number;
    type_first_order: string;
    price_first_order: number;
    active_def: boolean;
    def_type: string;
    io_calculate_type: string;
    io_count: number;
    io_step: number;
    io_mrt: number;
    io_step_mrt: number;
    stop_loss: number;
    active_tp: boolean;
    take_type: string;
    take_profit: number;
    take_amount: number;
    take_step: number;
    take_mrt: number;
    takes: any[];
    cycles: number;
}
const initialState: BotModel = {
    user_id: 19,
    wallet_id: 6,
    title: "Bot1",
    pair: "BTCUSDT",
    strategy: "LONG",
    active_buy: true,
    ammount_first_order: 1,
    type_first_order: "LIMIT",
    price_first_order: 1,
    active_def: true,
    def_type: "IO",
    io_calculate_type: "LO",
    io_count: 10,
    io_step: 1,
    io_mrt: 1,
    io_step_mrt: 1,
    stop_loss: 1,
    active_tp: true,
    take_type: "AUTO",
    take_profit: 2,
    take_amount: 50,
    take_step: 1,
    take_mrt: 1,
    takes: [],
    cycles: 0,
}

export const botSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload
            console.log(state.title);
        },
        toggle: (state, action?: PayloadAction<boolean>) => {
            state.active_buy = action ? action.payload : !state.active_buy
        },
    },
})

// Action creators are generated for each case reducer function
export const { toggle, setTitle } = botSlice.actions

export default botSlice.reducer