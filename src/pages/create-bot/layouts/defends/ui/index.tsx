import { FC, useState, useEffect } from "react";
import styles from "./style.module.scss";
import { clsx } from "clsx";
import { tgApp } from "shared/lib";
import { InsuranceOrdersLayout, StopLossLayout } from "../layouts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/AppStore";
import { Dispatch } from "@reduxjs/toolkit";
import { setField } from "pages/create-bot";
import { addAlert, deleteAlert } from "entities/notification";
import { useNavigate } from "react-router-dom";

export const DefendsLayout: FC = () => {
    const navigate = useNavigate();
    const tabs = [
        {
            title: "Insurance orders",
            disabled: false,
            id: "IO",
        },
        {
            title: "Stop Loss",
            disabled: false,
            id: "SL",
        },
    ];

    const {
        def_type,
        active_buy,
        active_def,
        active_tp,
        io_count,
        io_step,
        io_mrt,
        io_step_mrt,
        stop_loss,
        otherStates: { def_mrt, def_step_mrt },
    } = useSelector((state: RootState) => state.newBot);
    const dispatch: Dispatch<any> = useDispatch();

    const [activeTab, setActiveTab] = useState<string>(def_type);
    const handleTabChange = (tabId: "IO" | "SL") => {
        setActiveTab(tabId);
        dispatch(setField({ field: "def_type", value: tabId }));
    };

    const validation = (): boolean => {
        if (def_type === "IO") {
            if (+io_count < 1 || +io_count > 10) {
                dispatch(
                    addAlert({
                        title: "limit of insurance orders should be between 1 and 10",
                    })
                );
                return false;
            }
            if (+io_step < 1 || +io_step > 99) {
                dispatch(
                    addAlert({
                        title: "step of insurance orders should be between 1 and 99",
                    })
                );
                return false;
            }
            if (def_mrt && (+io_mrt < 1 || +io_mrt > 5)) {
                dispatch(
                    addAlert({
                        title: "martingale of insurance orders should be between 1 and 5",
                    })
                );
                return false;
            }
            if (def_step_mrt && (+io_step_mrt < 1 || +io_step_mrt > 5)) {
                dispatch(
                    addAlert({
                        title: "dynamic price of insurance orders should be between 1 and 5",
                    })
                );
                return false;
            }
        }

        if (def_type === "SL") {
            if (+stop_loss < 1 || +stop_loss > 99) {
                dispatch(
                    addAlert({ title: "stop loss should be between 1 and 99" })
                );
                return false;
            }
        }

        return true;
    };

    useEffect(() => {
        if (!active_def) {
            window.history.back();
        }

        const backButtonHandler = () => {
            window.history.back();
        };
        tgApp.BackButton.onClick(backButtonHandler);

        const mainButtonHandler = () => {
            if (validation()) {
                dispatch(deleteAlert());
                if (active_tp) navigate("/createbot/step4");
                else navigate("/createbot/step5");
            }
        };
        tgApp.MainButton.onClick(mainButtonHandler);

        tgApp.MainButton.text = "Next to step 4 / " + (5 + +active_tp);
        tgApp.MainButton.color = "#007AFF";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, [
        active_buy,
        active_def,
        active_tp,
        io_step,
        io_mrt,
        io_step_mrt,
        def_mrt,
        def_step_mrt,
        io_count,
        stop_loss,
        def_type,
    ]);

    const render = () => {
        switch (activeTab) {
            case "IO":
                return <InsuranceOrdersLayout />;
            case "SL":
                return <StopLossLayout />;
            default:
                return null;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h1 className={styles.top_title}>Defends</h1>
                <p className={styles.top_subtitle}>
                    Select the type of trading for detailed bot setup
                </p>
            </div>

            <div className={styles.tabs}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={clsx(
                            styles.tabs_button,
                            activeTab === tab.id && styles.tabs_button__active
                        )}
                        onClick={() => handleTabChange(tab.id as "IO" | "SL")} // Use handleTabChange instead of setActiveTab
                        disabled={tab.disabled}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>

            {render()}
        </div>
    );
};
