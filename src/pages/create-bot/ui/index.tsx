import { useEffect } from "react";

import {
    ConfigureLayout,
    DefendsLayout,
    DurationLayout,
    KeysListLayout,
    PairListLayout,
    ProfitLayout,
    EntryLayout,
    BotDetailsPage,
} from "../layouts";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { resetBot, setField } from "../model/botSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "app/AppStore";
import { tgApp } from "shared/lib";
import { fetchPairs } from "../layouts/pair-list/model/pairSlice";

export const CreateBotPage = () => {
    const user_id = useSelector((state: RootState) => state.user.data.user_id);
    const wallet_id = useSelector((state: RootState) => state.newBot.wallet_id);
    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        tgApp.MainButton.color = "#007AFF";
        return () => {
            dispatch(resetBot());
        };
    }, []);

    useEffect(() => {
        dispatch(setField({ field: "user_id", value: user_id }));
    }, [user_id]);

    useEffect(() => {
        if (wallet_id !== null) {
            dispatch(fetchPairs());
        }
    }, [wallet_id]);

    return (
        <Routes>
            <Route path="/step1" element={<ConfigureLayout />} />
            <Route path="/step1/pair-list" element={<PairListLayout />} />
            <Route path="/step1/keys-list" element={<KeysListLayout />} />
            <Route path="/step2" element={<EntryLayout />} />
            <Route path="/step3" element={<DefendsLayout />} />
            <Route path="/step4" element={<ProfitLayout />} />
            <Route path="/step5" element={<DurationLayout />} />
            <Route path="/step6/*" element={<BotDetailsPage />} />
        </Routes>
    );
};
