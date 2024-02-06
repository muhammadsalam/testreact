import { ReactNode, useRef, useState } from "react";
import styles from "./style.module.scss";
import { MainLayout } from "../layout";
import { ExchangeSelectLayout } from "../layout/exchange-select";
import { Route, Routes } from "react-router-dom";
import { Notification, NotificationWrapper } from "entities/notification";
import { notification } from "pages/create-bot";

export const AddKeyPage = () => {
    const [activeExchange, setActiveExchange] = useState("Binance");

    const [alert, setAlert] = useState<notification | undefined>(undefined);
    const timeoutId = useRef<any>(null);

    type addAlertType = {
        title: string;
        icon?: ReactNode;
        ms?: number;
    };

    const addAlert = ({ title, icon, ms }: addAlertType) => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        setAlert({ title, icon });

        timeoutId.current = setTimeout(() => {
            setAlert(undefined);
        }, ms || 3000);
    };

    const handleDeleteAlert = () => {
        setAlert(undefined);
        if (timeoutId.current) clearTimeout(timeoutId.current);
    };
    return (
        <div className={styles.container}>
            <NotificationWrapper>
                {alert && (
                    <Notification title={alert.title} icon={alert.icon} />
                )}
            </NotificationWrapper>

            <Routes>
                <Route
                    path="/"
                    element={
                        <MainLayout
                            activeExchange={activeExchange}
                            addAlert={addAlert}
                            handleDeleteAlert={handleDeleteAlert}
                        />
                    }
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
