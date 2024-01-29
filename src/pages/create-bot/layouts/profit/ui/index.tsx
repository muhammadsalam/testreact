import { FC, useState, useEffect } from "react";
import styles from "./style.module.scss";
import clsx from "clsx";
import { Cell } from "shared/ui";
import ArrowRightIcon from "../../../../../assets/icons/arrow.svg?react";
import { tgApp } from "shared/lib";
import { AutomaticLayout, ManuallyLayout } from "../layouts";
import { useBot } from "pages/create-bot/libs";

type Tab = {
    title: string;
    disabled: boolean;
    id: "MANUAL" | "AUTO";
};

export const ProfitLayout: FC = () => {
    const tabs: Tab[] = [
        {
            title: "Manually",
            disabled: false,
            id: "MANUAL",
        },
        {
            title: "Automatic",
            disabled: false,
            id: "AUTO",
        },
    ];

    const {
        bot: { take_type, active_buy, active_def, active_tp },
        setBot,
    } = useBot();

    const [activeTab, setActiveTab] = useState<"MANUAL" | "AUTO">(take_type);
    const handleTabChange = (tabId: "MANUAL" | "AUTO") => {
        setActiveTab(tabId);
        setBot((prev) => ({ ...prev, take_type: tabId }));
    };

    useEffect(() => {
        if (!active_tp) {
            window.history.back();
        }

        const backButtonHandler = () => {
            window.history.back();
        };
        tgApp.BackButton.onClick(backButtonHandler);

        const mainButtonHandler = () => {
            window.location.hash = "#5";
        };
        tgApp.MainButton.onClick(mainButtonHandler);

        tgApp.MainButton.text =
            "Next to step " +
            (3 + +active_buy + +active_def) +
            " / " +
            (4 + +active_buy + +active_def);
        tgApp.MainButton.color = "#007AFF";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, [active_buy, active_def, active_tp]);

    const render = () => {
        switch (activeTab) {
            case "MANUAL":
                return <ManuallyLayout />;
            case "AUTO":
                return <AutomaticLayout />;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h1 className={styles.top_title}>Take Profit</h1>
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
                        onClick={() => handleTabChange(tab.id)}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>

            <Cell title="Order type">
                <button className={styles.navButton_button}>
                    Limit Order
                    <ArrowRightIcon className={styles.navButton_icon} />
                </button>
            </Cell>

            {render()}
        </div>
    );
};
