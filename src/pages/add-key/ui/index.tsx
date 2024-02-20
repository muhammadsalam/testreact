import { useState } from "react";
import styles from "./style.module.scss";
import { ExchangeSelectLayout, MainLayout } from "../layout";
import { Route, Routes } from "react-router-dom";

export const AddKeyPage = () => {
    const [activeExchange, setActiveExchange] = useState("");

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
