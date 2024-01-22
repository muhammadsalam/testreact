import { FC, useState, useEffect } from "react";
import styles from "./style.module.scss";
import { clsx } from "clsx";
import { tgApp } from "shared/lib";
import { InsuranceOrdersLayout, StopLossLayout } from "../layouts";

export const DefendsLayout: FC = () => {
    const tabs = [
        {
            title: "Insurance orders",
            disabled: false,
        },
        {
            title: "Stop Loss",
            disabled: false,
        },
    ];
    const [activeTab, setActiveTab] = useState<string>(
        tabs[0].title.toLowerCase()
    );

    useEffect(() => {
        const backButtonHandler = () => {
            window.location.hash = "#2";
        };
        tgApp.BackButton.onClick(backButtonHandler);

        const mainButtonHandler = () => {
            window.location.hash = "#4";
        };
        tgApp.MainButton.onClick(mainButtonHandler);

        tgApp.MainButton.text = "Next to step 4 / 6";
        tgApp.MainButton.color = "#007AFF";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, []);

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
                            activeTab === tab.title.toLowerCase() &&
                                styles.tabs_button__active
                        )}
                        onClick={() => setActiveTab(tab.title.toLowerCase())}
                        disabled={tab.disabled}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>

            {
                {
                    "insurance orders": <InsuranceOrdersLayout />,
                    "stop loss": <StopLossLayout />,
                }[activeTab]
            }
        </div>
    );
};
