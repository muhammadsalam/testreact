import { Route, Routes } from "react-router-dom";
import {
    DetailsLayout,
    InsuranceGridLayout,
    ProfitGridLayout,
} from "./layouts";
import { useEffect } from "react";
import { tgApp } from "shared/lib";

export type OrdersType = {
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
    order_type: string;
    id: number;
    price: number;
    bot_id: number;
    amount_output: number;
    type: string;
    cycle: number;
}[];

const botOrders: OrdersType = [
    {
        amount_input: 3.125,
        bot_id: 182,
        pair: "ETHUSDT",
        status: "READY_TO_PLACED",
        order_type: "MARKET",
        price: 9.6,
        id: 1164,
        amount_output: 30,
        type: "IO_ORDER",
        cycle: 1,
    },
    {
        amount_input: 4.5,
        bot_id: 183,
        pair: "BTCUSDT",
        status: "CREATED",
        order_type: "LIMIT",
        price: 45000,
        id: 1165,
        amount_output: 0.055,
        type: "FIRST_ORDER",
        cycle: 2,
    },
    {
        amount_input: 6.8,
        bot_id: 184,
        pair: "ETHBTC",
        status: "CANCELED",
        order_type: "MARKET",
        price: 0.065,
        id: 1166,
        amount_output: 0.312,
        type: "IO_ORDER",
        cycle: 3,
    },
    {
        amount_input: 5.625,
        bot_id: 185,
        pair: "BNBUSDT",
        status: "POSTED",
        order_type: "MARKET",
        price: 120,
        id: 1167,
        amount_output: 675,
        type: "IO_ORDER",
        cycle: 4,
    },
    {
        amount_input: 2.125,
        bot_id: 186,
        pair: "XRPUSDT",
        status: "READY_TO_CANCEL",
        order_type: "LIMIT",
        price: 0.8,
        id: 1168,
        amount_output: 2.5,
        type: "IO_ORDER",
        cycle: 5,
    },
    {
        amount_input: 6.25,
        bot_id: 187,
        pair: "LTCUSDT",
        status: "READY_TO_REPLACE",
        order_type: "MARKET",
        price: 150,
        id: 1169,
        amount_output: 937.5,
        type: "FIRST_ORDER",
        cycle: 6,
    },
    {
        amount_input: 8.0,
        bot_id: 188,
        pair: "ETHUSDT",
        status: "WAIT",
        order_type: "LIMIT",
        price: 3000,
        id: 1170,
        amount_output: 4.5,
        type: "IO_ORDER",
        cycle: 7,
    },
    {
        amount_input: 10.0,
        bot_id: 189,
        pair: "BTCUSDT",
        status: "EXECUTED",
        order_type: "MARKET",
        price: 45000,
        id: 1171,
        amount_output: 0.055,
        type: "FIRST_ORDER",
        cycle: 8,
    },
    {
        amount_input: 10.0,
        bot_id: 189,
        pair: "BTCUSDT",
        status: "READY_TO_PLACED",
        order_type: "MARKET",
        price: 45000,
        id: 1171,
        amount_output: 0.055,
        type: "TAKE_PROFIT",
        cycle: 8,
    },
    {
        amount_input: 10.0,
        bot_id: 189,
        pair: "BTCUSDT",
        status: "READY_TO_PLACED",
        order_type: "MARKET",
        price: 45000,
        id: 1171,
        amount_output: 0.055,
        type: "TAKE_PROFIT",
        cycle: 8,
    },
    {
        amount_input: 10.0,
        bot_id: 189,
        pair: "BTCUSDT",
        status: "READY_TO_PLACED",
        order_type: "MARKET",
        price: 45000,
        id: 1171,
        amount_output: 0.055,
        type: "TAKE_PROFIT",
        cycle: 8,
    },
];

export const BotDetailsPage = () => {
    useEffect(() => {
        const backButtonHandler = () => {
            window.history.back();
        };

        tgApp.BackButton.onClick(backButtonHandler);

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
        };
    }, []);

    return (
        <Routes>
            <Route path="/" element={<DetailsLayout />} />
            <Route
                path="/insurance-grid"
                element={<InsuranceGridLayout botOrders={botOrders} />}
            />
            <Route
                path="/profit-grid"
                element={<ProfitGridLayout botOrders={botOrders} />}
            />
        </Routes>
    );
};
