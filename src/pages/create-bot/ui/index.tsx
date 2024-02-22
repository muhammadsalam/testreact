import { useEffect } from "react";

import {
    ConfigureLayout,
    DefendsLayout,
    DurationLayout,
    KeysListLayout,
    PairListLayout,
    ProfitLayout,
    EntryLayout,
} from "../layouts";
import { useDispatch, useSelector } from "react-redux";
import { fetchPairs } from "../layouts/pair-list/model/pairSlice";
import { Route, Routes } from "react-router-dom";
import { RootState } from "app/AppStore";
import { resetBot, setField } from "../model/botSlice";
import { Dispatch } from "@reduxjs/toolkit";

export const CreateBotPage = () => {
    const { def_mrt, def_step_mrt } = useSelector(
        (state: RootState) => state.newBot.otherStates
    );

    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        if (!def_mrt) {
            dispatch(setField({ field: "io_mrt", value: "1" }));
        }

        if (!def_step_mrt) {
            dispatch(setField({ field: "io_step_mrt", value: "1" }));
        }
    }, [def_mrt, def_step_mrt]);

    useEffect(() => {
        dispatch(fetchPairs());

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
        </Routes>
    );
};
