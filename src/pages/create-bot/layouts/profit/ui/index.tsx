import { FC, useState, useEffect } from "react";
import styles from "./style.module.scss";
import clsx from "clsx";
import { Cell } from "shared/ui";
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
        addAlert,
        otherStates,
        bot: {
            take_type,
            active_buy,
            active_def,
            active_tp,
            existing_volume,
            takes,
            take_profit,
            take_amount,
            take_step,
            take_mrt,
        },
        setBot,
    } = useBot();

    const [activeTab, setActiveTab] = useState<"MANUAL" | "AUTO">(take_type);
    const handleTabChange = (tabId: "MANUAL" | "AUTO") => {
        setActiveTab(tabId);
        setBot((prev) => ({ ...prev, take_type: tabId }));
    };

    const validation = (): boolean => {
        if (take_type === "MANUAL") {
            if (!active_buy) {
                if (+existing_volume < 0 || existing_volume.length === 0) {
                    addAlert({
                        title: "Invalid Existing Volume (should be >0)",
                    });
                    return false;
                }
            }

            if (+takes < 0) {
                addAlert({ title: "Invalid Takes (should be >0)" });
                return false;
            }

            for (let i = 0; i < takes.length; i++) {
                if (+takes[i].step < 1) {
                    addAlert({
                        title:
                            "Invalid intermediate take profit in step" +
                            (i + 1) +
                            " (should be >0)",
                    });
                    return false;
                }

                if (+takes[i].amount < 1 || +takes[i].amount > 100) {
                    addAlert({
                        title:
                            "Invalid amount in step" +
                            (i + 1) +
                            " (should be 0< and >100)",
                    });
                    return false;
                }
            }

            if (takes.reduce((total, take) => total + +take, 0) > 100) {
                addAlert({ title: "Total amount should be <= 100%" });
                return false;
            }
        }

        if (take_type === "AUTO") {
            if (+take_profit <= 1) {
                addAlert({ title: "Invalid take profit (should be >1)" });
                return false;
            }

            if (+take_amount < 1 || +take_amount > 100) {
                addAlert({
                    title: "Invalid first take profit quantity (should be 0< and >100)",
                });
                return false;
            }

            if (otherStates.take_step && (+take_step < 1 || +take_step > 5)) {
                addAlert({
                    title: "Invalid step take profit (should be 1< and >5)",
                });
                return false;
            }

            if (otherStates.take_mrt && (+take_mrt < 1 || +take_mrt > 5)) {
                addAlert({
                    title: "Invalid martingale take profit (should be 1< and >5)",
                });
                return false;
            }
        }

        return true;
    };

    useEffect(() => {
        console.log(validation());
        if (!active_tp) {
            window.history.back();
        }

        const backButtonHandler = () => {
            window.history.back();
        };
        tgApp.BackButton.onClick(backButtonHandler);

        const mainButtonHandler = () => {
            if (validation()) {
                window.location.hash = "#5";
            }
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
    }, [
        active_buy,
        active_def,
        active_tp,
        take_profit,
        take_amount,
        take_step,
        take_mrt,
        existing_volume,
        takes,
        take_type,
        otherStates.take_mrt,
        otherStates.take_step,
    ]);

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
                <div className={styles.navButton_button}>Limit Order</div>
            </Cell>

            {render()}
        </div>
    );
};
