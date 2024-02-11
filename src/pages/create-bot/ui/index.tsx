import { useEffect } from "react";

import {
    ConfigureLayout,
    DefendsLayout,
    DurationLayout,
    PairListLayout,
    ProfitLayout,
    StrategyLayout,
} from "../layouts";
import { useDispatch, useSelector } from "react-redux";
import { fetchPairs } from "../layouts/pair-list/model/pairSlice";
import { Route, Routes } from "react-router-dom";
import { RootState } from "app/AppStore";
import { setField } from "../model/botSlice";

export const CreateBotPage = () => {
    const { def_mrt, def_step_mrt } = useSelector(
        (state: RootState) => state.newBot.otherStates
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (!def_mrt) {
            dispatch(setField({ field: "io_mrt", value: "1" }));
        }

        if (!def_step_mrt) {
            dispatch(setField({ field: "io_step_mrt", value: "1" }));
        }
    }, [def_mrt, def_step_mrt]);

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchPairs());
    }, []);

    return (
        <Routes>
            <Route path="/step1" element={<ConfigureLayout />} />
            <Route path="/step1/pair-list" element={<PairListLayout />} />
            <Route path="/step2" element={<StrategyLayout />} />
            <Route path="/step3" element={<DefendsLayout />} />
            <Route path="/step4" element={<ProfitLayout />} />
            <Route path="/step5" element={<DurationLayout />} />
        </Routes>
    );
};
