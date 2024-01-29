import { FC, useState, useEffect } from "react";
import styles from "./style.module.scss";
import { clsx } from "clsx";
import { tgApp } from "shared/lib";
import { InsuranceOrdersLayout, StopLossLayout } from "../layouts";
import { useBot } from "pages/create-bot/libs"; // Import BotModel

export const DefendsLayout: FC = () => {
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
        bot: { def_type, active_buy, active_def, active_tp },
        setBot,
    } = useBot();

    const [activeTab, setActiveTab] = useState<string>(def_type);
    const handleTabChange = (tabId: "IO" | "SL") => {
        setActiveTab(tabId);
        setBot((prev) => ({ ...prev, def_type: tabId }));
    };

    useEffect(() => {
        const backButtonHandler = () => {
            window.location.hash = "#2";
        };
        tgApp.BackButton.onClick(backButtonHandler);

        const mainButtonHandler = () => {
            window.location.hash = "#4";
        };
        tgApp.MainButton.onClick(mainButtonHandler);

        tgApp.MainButton.text =
            "Next to step 4 / " + (3 + +active_buy + +active_def + +active_tp);
        tgApp.MainButton.color = "#007AFF";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, []);

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
