import { useState } from "react";
import styles from "./style.module.scss";
import { ExchangeSelectLayout, MainLayout } from "../layout";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

export const AddKeyPage = () => {
    const selectExchangeType = (state: any) => state.user.data.exchange_type;
    const exchange_type = useSelector(selectExchangeType);
    const [activeExchange, setActiveExchange] = useState(exchange_type);

    return (
        <div className={styles.container}>
            <Routes>
                <Route
                    path="/"
                    element={<MainLayout activeExchange={activeExchange} />}
                />
                <Route
                    path="/select-exchange"
                    element={
                        <ExchangeSelectLayout
                            activeExchange={activeExchange}
                            setActiveExchange={setActiveExchange}
                        />
                    }
                />
            </Routes>
        </div>
    );
};
