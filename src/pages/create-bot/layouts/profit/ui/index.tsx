import { FC, useState, useEffect } from "react";
import styles from "./style.module.scss";
import clsx from "clsx";
import { Cell } from "shared/ui";
import ArrowRightIcon from "../../../../../assets/icons/arrow.svg?react";
import { tgApp } from "shared/lib";
import { AutomaticLayout, ManuallyLayout } from "../layouts";

export const ProfitLayout: FC = () => {
    const tabs = [
        {
            title: "Manually",
            disabled: false,
        },
        {
            title: "Automatic",
            disabled: false,
        },
    ];
    const [activeTab, setActiveTab] = useState<string>(
        tabs[0].title.toLowerCase()
    );

    useEffect(() => {
        const backButtonHandler = () => {
            window.location.hash = "#3";
        };
        tgApp.BackButton.onClick(backButtonHandler);

        const mainButtonHandler = () => {
            window.location.hash = "#5";
        };
        tgApp.MainButton.onClick(mainButtonHandler);

        tgApp.MainButton.text = "Next to step 5 / 6";
        tgApp.MainButton.color = "#007AFF";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, []);

    const render = () => {
        switch (activeTab) {
            case "manually":
                return <ManuallyLayout />;
            case "automatic":
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
                            activeTab === tab.title.toLowerCase() &&
                                styles.tabs_button__active
                        )}
                        onClick={() => setActiveTab(tab.title.toLowerCase())}
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
