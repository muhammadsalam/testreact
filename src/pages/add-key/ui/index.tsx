import { ReactNode, useCallback, useRef, useState } from "react";
import styles from "./style.module.scss";
import { ExchangeSelectLayout, MainLayout } from "../layout";
import { Route, Routes } from "react-router-dom";
import { Notification, NotificationWrapper } from "entities/notification";
import { notification } from "pages/create-bot";
import { useSelector } from "react-redux";

export const AddKeyPage = () => {
    const selectExchangeType = (state: any) => state.user.data.exchange_type;
    const exchange_type = useSelector(selectExchangeType);
    const [activeExchange, setActiveExchange] = useState(exchange_type);

    const [alert, setAlert] = useState<notification | undefined>(undefined);
    const timeoutId = useRef<any>(null);

    type addAlertType = {
        title: string;
        icon?: ReactNode;
        ms?: number;
    };

    const addAlert = useCallback(({ title, icon, ms }: addAlertType) => {
        if (timeoutId.current) {
            clearTimeout(timeoutId.current);
        }

        setAlert({ title, icon });

        timeoutId.current = setTimeout(() => {
            setAlert(undefined);
        }, ms || 3000);
    }, []);

    const handleDeleteAlert = useCallback(() => {
        setAlert(undefined);
        if (timeoutId.current) clearTimeout(timeoutId.current);
    }, []);
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
