import { useEffect, useState } from "react";
import styles from "./style.module.scss";
import { ExchangeSelectLayout, MainLayout } from "../layout";
import { Route, Routes, useLocation } from "react-router-dom";
import { ExchangeType } from "entities/exchanges";
import { blockVerticalScrollApp } from "shared/lib";

export const AddKeyPage = () => {
    const [activeExchange, setActiveExchange] = useState<ExchangeType>(null);

    const location = useLocation();
    useEffect(() => {
        blockVerticalScrollApp(true);
    }, [location]);

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
