export interface BotData {
    purchase_price: number;
    io_step: number | null;
    take_step: number | null;
    user_id: number;
    io_mrt: number | null;
    wallet_id: number;
    type_first_order: "LIMIT" | "MARKET";
    io_step_mrt: number | null;
    take_mrt: number | null;
    take_amount_limit: number | null;
    amount_first_order: number;
    price_first_order: number;
    stop_loss: number;
    cycle_count: number;
    cycle_input_type: "FIXED" | "CORRECTION";
    cycle_fixed_price: number | null;
    cycle_correction: number | null;
    cycle_amount_type: "FIXED" | "ALL_PROFIT" | "LAST_PROFIT";
    cycle_fixed_amount: number | null;
    cycle_dynamic_amount: number | null;
    pair: string;
    // status: string;
    takes: {
        step: number;
        amount: number;
    }[];
    strategy: "LONG";
    def_type: "IO" | "SL" | "NONE";
    take_type: "AUTO" | "MANUAL" | "NONE";
    // id: 152;
    entry_type: "BUY_COIN" | "USE_WALLET";
    io_calculate_type: "LO" | "AO";
    take_profit: number | null;
    existing_volume: number | null;
    io_count: number | null;
    take_amount: number | null;
    price_socket_time: number | null;
    user_socket_time: number | null;
    title: string;
    orders: {
        pair: string;
        amount_input: number;
        status: string;
        order_type: string;
        id: number;
        price: number;
        bot_id: number;
        amount_output: number;
        type: string;
        cycle: number;
    }[];
}