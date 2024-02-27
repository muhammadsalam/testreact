import { Route, Routes } from "react-router-dom";
import {
    DetailsLayout,
    InsuranceGridLayout,
    ProfitGridLayout,
} from "./layouts";
import { useEffect } from "react";
import { tgApp } from "shared/lib";
import { useSelector } from "react-redux";
import { RootState } from "app/AppStore";
import { useDispatch } from "react-redux";
import { createBot } from "pages/create-bot";
import { Dispatch } from "@reduxjs/toolkit";

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

export const BotDetailsPage = () => {
    const token = useSelector((state: RootState) => state.user.token);
    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        const backButtonHandler = () => {
            window.history.back();
        };
        tgApp.BackButton.onClick(backButtonHandler);

        dispatch(createBot({ token, preCosting: true }));
        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
        };
    }, []);

    return (
        <Routes>
            <Route path="/" element={<DetailsLayout />} />
            <Route path="/insurance-grid" element={<InsuranceGridLayout />} />
            <Route path="/profit-grid" element={<ProfitGridLayout />} />
        </Routes>
    );
};
