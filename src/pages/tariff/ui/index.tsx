import LogoSVG from "assets/icons/logo.svg?react";
import styles from "./styles.module.scss";
import { Cell, CellListItem } from "shared/ui";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { blockVerticalScrollApp, tgApp } from "shared/lib";
import { useNavigate } from "react-router-dom";
import MarkICON from "assets/icons/mark.svg?react";

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

type RadioItem = {
    id: string;
    title: string;
    lineTgroughPrice: string;
    price: string;
    discount: string;
    monthlyPrice: string;
};

const radios: RadioItem[] = [
    {
        id: "yearly",
        title: "Yearly",
        lineTgroughPrice: "$468",
        price: "$348 a year",
        discount: "-20%",
        monthlyPrice: "$29/month",
    },
    {
        id: "6months",
        title: "6 months",
        lineTgroughPrice: "$468",
        price: "$396 a year",
        discount: "-10%",
        monthlyPrice: "$33/month",
    },
    {
        id: "monthly",
        title: "Monthly",
        lineTgroughPrice: "",
        price: "",
        discount: "",
        monthlyPrice: "$39/month",
    },
];

export const TariffPage = () => {
    const [activeTabindex, setActiveTab] = useState<number>(0);
    const handleTabChange = (tabId: number) => {
        if (tabId === activeTabindex) return;

        setActiveTab(tabId);
    };

    const [activeRadio, setActiveRadio] = useState(radios[0]);

    const handleRadioClick = (radio: RadioItem) => {
        setActiveRadio(radio);
    };

    const navigate = useNavigate();

    useEffect(() => {
        const backButtonHandler = () => {
            navigate("/");
        };

        const mainButtonHandler = () => {
            navigate("/");
        };

        tgApp.BackButton.onClick(backButtonHandler);
        tgApp.MainButton.onClick(mainButtonHandler);
        tgApp.BackButton.show();
        tgApp.MainButton.show();
        tgApp.MainButton.text = "Confirm";
        tgApp.MainButton.color = "#007AFF";
        tgApp.MainButton.textColor = "#fff";
        tgApp.setHeaderColor("#000");

        blockVerticalScrollApp(true);

        return () => {
            tgApp.MainButton.hide();
            tgApp.BackButton.hide();
            tgApp.BackButton.offClick(backButtonHandler);
            tgApp.MainButton.offClick(mainButtonHandler);
        };
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

                <Cell>
                    {radios.map((radio) => (
                        <CellListItem
                            topBottomPadding={0}
                            key={radio.id}
                            className={styles.radioItem}
                            onClick={() => handleRadioClick(radio)}
                        >
                            <div
                                className={clsx(styles.radioItem_checkbox, {
                                    [styles.radioItem_checkbox__active]:
                                        activeRadio.id === radio.id,
                                })}
                            >
                                {activeRadio.id === radio.id && <MarkICON />}
                            </div>

                            <div className={styles.radioItem_content}>
                                <div className={styles.radioItem_info}>
                                    <strong>
                                        {radio.title}
                                        {radio.discount && (
                                            <span>{radio.discount}</span>
                                        )}
                                    </strong>
                                    {radio.price && (
                                        <p>
                                            {radio.lineTgroughPrice && (
                                                <s>{radio.lineTgroughPrice}</s>
                                            )}{" "}
                                            {radio.price}
                                        </p>
                                    )}
                                </div>
                                <div className={styles.radioItem_price}>
                                    {radio.monthlyPrice}
                                </div>
                            </div>
                        </CellListItem>
                    ))}
                </Cell>

                <p className={styles.accepting}>
                    By subscribing, you accept the <a href="">Terms of Use</a>{" "}
                    and <a href="">User Agreement</a>
                </p>

                <Cell title="additionally">
                    <CellListItem
                        topBottomPadding={16}
                        style={{ color: "#000" }}
                    >
                        You won't be billed today. We'll just update the number
                        of days left on your new subscription.
                    </CellListItem>
                </Cell>
            </div>
        </div>
    );
};
