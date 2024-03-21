import LogoSVG from "assets/icons/logo.svg?react";
import styles from "./styles.module.scss";
import { Cell, CellListItem } from "shared/ui";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { tgApp } from "shared/lib";
import { useNavigate } from "react-router-dom";

type Tab = {
    id: string;
    title: string;
    count_bots: string;
    cycles: string;
    take_profit: string;
    insurance_orders: string;
};

const tabs: Tab[] = [
    {
        id: "standart",

        title: "Standart",
        count_bots: "7 bots",
        cycles: "10 cycles",
        take_profit: "10%",
        insurance_orders: "5 orders",
    },
    {
        id: "premium",
        title: "Premium",
        count_bots: "",
        cycles: "",
        take_profit: "",
        insurance_orders: "",
    },
];

export const TariffPage = () => {
    const [activeTabindex, setActiveTab] = useState<number>(0);
    const handleTabChange = (tabId: number) => {
        if (tabId === activeTabindex) return;

        setActiveTab(tabId);
    };

    useEffect(() => {
        const backButtonHandler = () => {
            useNavigate()("/");
        };

        const mainButtonHandler = () => {
            console.log("click on confirm");
        };

        tgApp.BackButton.onClick(backButtonHandler);
        tgApp.MainButton.onClick(mainButtonHandler);
        tgApp.BackButton.show();
        tgApp.MainButton.show();
        tgApp.MainButton.text = "Confirm";
        tgApp.MainButton.color = "#007AFF";
        tgApp.MainButton.textColor = "#fff";
    }, []);

    return (
        <div className={styles.wrapper}>
            <style>
                {`html {
                    background-color: #0b0b0c;
                }`}
            </style>
            <LogoSVG className={styles.logo} />

            <div className={styles.container}>
                <h1 className={styles.title}>Tariff plan</h1>

                <Cell>
                    <CellListItem
                        className={styles.listItem}
                        topBottomPadding={16}
                        isLabel={false}
                    >
                        <div className={styles.tabs}>
                            {tabs.map((tab, index) => (
                                <button
                                    key={tab.id}
                                    className={clsx(
                                        styles.tabs_button,
                                        activeTabindex === index &&
                                            styles.tabs_button__active
                                    )}
                                    onClick={() => handleTabChange(index)}
                                >
                                    {tab.title}
                                </button>
                            ))}
                        </div>
                    </CellListItem>
                    <CellListItem
                        topBottomPadding={8}
                        className={styles.listItem}
                    >
                        <span>Count bots</span>
                        <span>{tabs[activeTabindex].count_bots}</span>
                    </CellListItem>
                    <CellListItem
                        topBottomPadding={8}
                        className={styles.listItem}
                    >
                        <span>Cycles</span>
                        <span>{tabs[activeTabindex].cycles}</span>
                    </CellListItem>
                    <CellListItem
                        topBottomPadding={8}
                        className={styles.listItem}
                    >
                        <span>Take Profit</span>
                        <span>{tabs[activeTabindex].take_profit}</span>
                    </CellListItem>
                    <CellListItem
                        topBottomPadding={8}
                        className={styles.listItem}
                    >
                        <span>Insurance orders</span>
                        <span>{tabs[activeTabindex].insurance_orders}</span>
                    </CellListItem>
                </Cell>
            </div>
        </div>
    );
};
