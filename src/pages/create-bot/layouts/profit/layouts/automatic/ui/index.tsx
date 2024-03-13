import { FC, useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Cell, CellListItem, Range, Switcher } from "shared/ui";
import { handleInputFocus, handleInputScroll, tgApp } from "shared/lib";
import clsx from "clsx";
import { useRange } from "shared/ui/range/libs/use-range";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/AppStore";
import { Dispatch } from "@reduxjs/toolkit";
import { setField } from "pages/create-bot";
import { addAlert, deleteAlert } from "entities/notification";
import { useNavigate } from "react-router-dom";

const tabs: { title: string; id: "part" | "full" }[] = [
    {
        title: "Full",
        id: "full",
    },
    {
        title: "Part",
        id: "part",
    },
];

export const AutomaticLayout: FC = () => {
    const { take_profit, take_amount, take_step, take_mrt, otherStates } =
        useSelector((state: RootState) => state.newBot);
    const dispatch: Dispatch<any> = useDispatch();

    const [TProfit, setTProfit] = useState("" + take_profit);
    const handleTProfitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(",", ".");
        if (!/^\d*(\.\d{0,2})?$/.test(value)) return;

        if (
            (!(value.includes("0.") || value.includes("0,")) &&
                value.startsWith("0") &&
                value.length > 1) ||
            /^\D/.test(value)
        ) {
            value = value.slice(1);
            e.target.value = value;
        }

        setTProfit(value);

        const isFloated = value.split(".")[1] !== "";
        // если есть дробная часть и оно не NaN отменяем диспатч
        if (!isFloated && isNaN(+value)) return;

        dispatch(
            setField({
                field: "take_profit",
                value: !isFloated ? "" + +value : value,
            })
        );
    };

    const [TAmount, setTAmount] = useState("" + take_amount);
    const handleTAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(",", ".");
        if (!/^\d*(\.\d{0,2})?$/.test(value)) return;

        if (
            (!(value.includes("0.") || value.includes("0,")) &&
                value.startsWith("0") &&
                value.length > 1) ||
            /^\D/.test(value)
        ) {
            value = value.slice(1);
            e.target.value = value;
        }

        setTAmount(value);

        const isFloated = value.split(".")[1] !== "";
        // если есть дробная часть и оно не NaN отменяем диспатч
        if (!isFloated && isNaN(+value)) return;

        dispatch(
            setField({
                field: "take_amount",
                value: !isFloated ? "" + +value : value,
            })
        );
    };

    const handleTStepChange = (value: string) => {
        dispatch(setField({ field: "take_step", value: value }));
    };

    const handleTMrtChange = (value: string) => {
        dispatch(setField({ field: "take_mrt", value: value }));
    };

    const handleTAmountLimit = (value: string) => {
        dispatch(setField({ field: "take_amount_limit", value: value }));
    };

    const handleTakeStepSwitch = () => {
        dispatch(
            setField({
                field: "otherStates",
                value: { ...otherStates, take_step: !otherStates.take_step },
            })
        );
    };

    const handleTakeMrtSwitch = () => {
        dispatch(
            setField({
                field: "otherStates",
                value: { ...otherStates, take_mrt: !otherStates.take_mrt },
            })
        );
    };

    const takeStepData = useRange(0.5, 5, +take_step);
    const takeMrtData = useRange(0.5, 5, +take_mrt);
    const totalAmoutForSale = useRange(1, 100, 100);

    const [activeTab, setActiveTab] = useState<"full" | "part">(tabs[0].id);
    const handleTabChange = (tabId: "full" | "part") => {
        if (tabId === activeTab) return;
        if (tabId === "full") {
            totalAmoutForSale.setValue(100);
            handleTAmountLimit("100");
        }
        setActiveTab(tabId);
    };

    useEffect(() => {
        if (!otherStates.take_step) {
            handleTStepChange("1");
            takeStepData.setValue(1);
        }
        if (!otherStates.take_mrt) {
            handleTMrtChange("1");
            takeMrtData.setValue(1);
        }
    }, [otherStates]);

    const validation = () => {
        if (+take_profit <= 1) {
            dispatch(
                addAlert({
                    title: 'The "Take profit" field value must be greater than 1',
                })
            );
            return false;
        }

        if (+take_amount < 1 || +take_amount > 100) {
            dispatch(
                addAlert({
                    title: "The value of the “Take amount” field must be greater than or equal to 1, but not greater than 100",
                })
            );
            return false;
        }

        return true;
    };

    const navigate = useNavigate();

    useEffect(() => {
        const mainButtonHandler = () => {
            if (validation()) {
                dispatch(deleteAlert());
                navigate("/createbot/step5");
            }
        };

        tgApp.MainButton.onClick(mainButtonHandler);

        return () => {
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, [otherStates, take_profit, take_amount, take_mrt, take_step]);

    return (
        <>
            <Cell title="Take Profit">
                <CellListItem>
                    <p className={styles.listItem_title}>Take Profit, %</p>
                    <input
                        type="text"
                        inputMode="decimal"
                        className={styles.listItem_input}
                        onFocus={handleInputFocus}
                        onClick={handleInputScroll}
                        value={TProfit}
                        onChange={handleTProfitChange}
                    />
                </CellListItem>
            </Cell>

            <Cell>
                <CellListItem isLabel={false}>
                    Total amount for sale
                    <div className={styles.tabs}>
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={clsx(
                                    styles.tabs_button,
                                    activeTab === tab.id &&
                                        styles.tabs_button__active
                                )}
                                onClick={() => handleTabChange(tab.id)}
                            >
                                {tab.title}
                            </button>
                        ))}
                    </div>
                </CellListItem>
                <CellListItem>
                    {activeTab === "full" ? (
                        <div className={styles.range_line}></div>
                    ) : (
                        <Range
                            handle={handleTAmountLimit}
                            lineClassName={styles.rangeLine}
                            topClassName={styles.rangeTop}
                            sliderClassName={clsx(styles.rangeWrapper)}
                            {...totalAmoutForSale}
                            min={"1"}
                            max={"100"}
                            currValue={100}
                        />
                    )}
                    <span className={styles.totalAmountSpan}>
                        {activeTab === "full" ? "100" : totalAmoutForSale.value}
                        %
                    </span>
                </CellListItem>
            </Cell>

            <Cell>
                <CellListItem>
                    <p className={styles.listItem_title}>Take Amount, %</p>
                    <input
                        type="text"
                        inputMode="decimal"
                        className={styles.listItem_input}
                        onFocus={handleInputFocus}
                        onClick={handleInputScroll}
                        value={TAmount}
                        onChange={handleTAmountChange}
                    />
                </CellListItem>
            </Cell>

            <Cell description="Step Take Profit is a tool that automatically sells a portion of assets when certain price levels are reached to lock in profits in stages.">
                <CellListItem color="#000">
                    <p className={styles.switch_title}>Step Take Profit</p>
                    <Switcher
                        switchData={{
                            state: otherStates.take_step,
                            handle: handleTakeStepSwitch,
                        }}
                    />
                </CellListItem>
                <CellListItem
                    className={clsx(styles.wrapper, {
                        [styles.wrapper__active]: otherStates.take_step,
                    })}
                    topBottomPadding={otherStates.take_step ? undefined : 0}
                >
                    <Range
                        {...takeStepData}
                        min="0.5"
                        max="5"
                        step={0.1}
                        currValue={+take_step}
                        handle={handleTStepChange}
                    />
                </CellListItem>
            </Cell>

            <Cell description="Martingale is a trading tool in which the trade size increases after each correction to average price.">
                <CellListItem color="#000">
                    <p className={styles.switch_title}>Martingale</p>
                    <Switcher
                        switchData={{
                            state: otherStates.take_mrt,
                            handle: handleTakeMrtSwitch,
                        }}
                    />
                </CellListItem>
                <CellListItem
                    className={clsx(styles.wrapper, {
                        [styles.wrapper__active]: otherStates.take_mrt,
                    })}
                    topBottomPadding={otherStates.take_mrt ? undefined : 0}
                >
                    <Range
                        {...takeMrtData}
                        min="0.5"
                        max="5"
                        currValue={+take_mrt}
                        step={0.1}
                        handle={handleTMrtChange}
                    />
                </CellListItem>
            </Cell>
        </>
    );
};
