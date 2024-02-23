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
import { fetchPairs } from "../layouts/pair-list/model/pairSlice";
import { Route, Routes } from "react-router-dom";
import { resetBot, setField } from "../model/botSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "app/AppStore";

export const CreateBotPage = () => {
    const user_id = useSelector((state: RootState) => state.user.data.user_id);
    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        dispatch(fetchPairs());
        dispatch(setField({ field: "user_id", value: user_id }));

        return () => {
            dispatch(resetBot());
        };
    }, []);

    return (
        <Routes>
            <Route path="/step1" element={<ConfigureLayout />} />
            <Route path="/step1/pair-list" element={<PairListLayout />} />
            <Route path="/step1/keys-list" element={<KeysListLayout />} />
            <Route path="/step2" element={<EntryLayout />} />
            <Route path="/step3" element={<DefendsLayout />} />
            <Route path="/step4" element={<ProfitLayout />} />
            <Route path="/step5" element={<DurationLayout />} />
            <Route path="/step6" element={<BotDetailsPage />} />
        </Routes>
    );
};
