import { FC, useEffect, useState } from "react";
import styles from "./style.module.scss";
import { Cell, CellListItem, Dropdown } from "shared/ui";
import clsx from "clsx";
import { handleInputFocus, handleInputScroll, tgApp } from "shared/lib";
import { useBot } from "pages/create-bot/libs";

export const StrategyLayout: FC = () => {
    const tabs = [
        {
            title: "Manually",
            disabled: false,
        },
        {
            title: "By indicator",
            disabled: true,
        },
    ];
    const [activeTab, setActiveTab] = useState<string>(
        tabs[0].title.toLowerCase()
    );

    const {
        bot: {
            ammount_first_order,
            type_first_order,
            price_first_order,
            active_buy,
            active_def,
            active_tp,
        },
        setBot,
    } = useBot();

    const inputTypeItems = [
        {
            title: "From the first order",
            id: "",
        },
        {
            title: "Market order",
            id: "",
        },
    ];

    // const onInputTypeSwitch = (type: string) => {
    //     setBot((prevState) => {
    //         return { ...prevState, type_first_order: type };
    //     });
    // };

    const [amountInputType, setAmountInputType] = useState<string>(
        ammount_first_order.toString()
    );
    const handleITChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        console.log(value);
        if (value.includes("e")) return;
        if (Number(value) < 0) return;
        if (
            (value.startsWith("-") ||
                value.startsWith("+") ||
                value.startsWith("0")) &&
            value.length > 1
        ) {
            value = value.slice(1);
        }
        setAmountInputType(value);
        setBot((prevState) => {
            return { ...prevState, ammount_first_order: Number(value) };
        });
    };

    // ======================

    const firstOrderItems = [
        {
            title: "Limit order",
            id: "LIMIT",
        },
        {
            title: "Market order",
            id: "MARKET",
        },
    ];

    const onFirstOrderTypeSwitch = (type: string) => {
        setBot((prevState) => {
            return { ...prevState, type_first_order: type };
        });
    };

    const [amountFO, setAmountFO] = useState<string>(
        price_first_order.toString()
    );
    const handleFOChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if (Number(value) < 0) return;
        if (
            (value.startsWith("-") ||
                value.startsWith("+") ||
                value.startsWith("0")) &&
            value.length > 1
        ) {
            value = value.slice(1);
        }
        setAmountFO(value);
        setBot((prevState) => {
            return { ...prevState, price_first_order: Number(value) };
        });
    };

    useEffect(() => {
        if (!active_buy) {
            window.history.back();
        }

        const backButtonHandler = () => {
            window.location.hash = "#1";
        };
        tgApp.BackButton.onClick(backButtonHandler);

        const mainButtonHandler = () => {
            if (active_def) window.location.hash = "#3";
            else if (active_tp) window.location.hash = "#4";
            else window.location.hash = "#5";
        };
        tgApp.MainButton.onClick(mainButtonHandler);

        tgApp.MainButton.text =
            "Next to step 3 / " + (3 + +active_buy + +active_def + +active_tp);
        tgApp.MainButton.color = "#007AFF";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, [active_buy, active_def, active_tp]);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <p className={styles.top_title}>Strategy</p>
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
                        {tab.disabled && <span>Soon</span>}
                    </button>
                ))}
            </div>

            <Cell description="Min 5.03 USDT / 0.00021 BTC">
                <CellListItem>
                    <p className={styles.list_item_title}>Input type</p>
                    <Dropdown items={inputTypeItems} />
                </CellListItem>

                <CellListItem>
                    <p className={styles.list_item_title}>
                        Volume of the first order
                    </p>
                    <input
                        type="number"
                        className={styles.list_item_input}
                        value={amountInputType}
                        onChange={handleITChange}
                        onFocus={handleInputFocus}
                        onClick={handleInputScroll}
                    />
                </CellListItem>
            </Cell>

            <Cell>
                <CellListItem>
                    <p className={styles.list_item_title}>
                        Type of the first order
                    </p>
                    <Dropdown
                        onSwitch={onFirstOrderTypeSwitch}
                        items={firstOrderItems}
                        defaultValueIndex={firstOrderItems.findIndex(
                            (item) => item.id === type_first_order
                        )}
                    />
                </CellListItem>

                <CellListItem
                    className={clsx(styles.listItem_wrapper, {
                        [styles.listItem_wrapper__active]:
                            type_first_order === "LIMIT",
                    })}
                    topBottomPadding={
                        type_first_order === "LIMIT" ? undefined : 0
                    }
                >
                    <p className={styles.list_item_title}>
                        Price for a limit order
                    </p>
                    <input
                        type="number"
                        className={styles.list_item_input}
                        value={amountFO}
                        onChange={handleFOChange}
                        onFocus={handleInputFocus}
                        onClick={handleInputScroll}
                    />
                </CellListItem>
            </Cell>
        </div>
    );
};
