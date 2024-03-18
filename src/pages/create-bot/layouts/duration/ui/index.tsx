import { FC, useEffect, useState } from "react";
import styles from "./style.module.scss";
import { handleInputFocus, handleInputScroll, tgApp } from "shared/lib";
import { Cell, CellListItem, Dropdown, FlexWrapper, Switcher } from "shared/ui";
import { useRange } from "shared/ui/range/libs/use-range";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/AppStore";
import { Dispatch } from "@reduxjs/toolkit";
import { addAlert, deleteAlert } from "entities/notification";
import { BotModel, setField } from "pages/create-bot";

const settingNextDropdown: {
    title: string;
    id: BotModel["cycles"]["input_type"];
    disabled?: boolean;
}[] = [
    {
        title: "For a price",
        id: "FIXED",
    },
    {
        title: "On correction",
        id: "CORRECTION",
    },
    {
        title: "By indicator",
        id: "BY_INDICATOR",
        disabled: true,
    },
];

const definitionTypeDropdown: {
    title: string;
    id: BotModel["cycles"]["amount_type"];
}[] = [
    {
        title: "Fixed volume",
        id: "FIXED",
    },
    {
        title: "All profit",
        id: "ALL_PROFIT",
    },
    {
        title: "By last profit",
        id: "LAST_PROFIT",
    },
];

export const DurationLayout: FC = () => {
    const navigate = useNavigate();
    const dispatch: Dispatch<any> = useDispatch();
    const { cycles, otherStates, pair } = useSelector(
        (state: RootState) => state.newBot
    );

    const [fixedPrice, setFixedPrice] = useState(cycles.fixed_price);

    const handleFixedPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(",", ".");
        const regexp = new RegExp(
            `^\\d*(\\.\\d{0,${pair?.precision.quote}})?$`
        );
        if (!regexp.test(value)) return;

        if (
            (!(value.includes("0.") || value.includes("0,")) &&
                value.startsWith("0") &&
                value.length > 1) ||
            /^\D/.test(value)
        ) {
            value = value.slice(1);
            e.target.value = value;
        }

        setFixedPrice(value);

        const isFloated = value.split(".")[1] !== "";
        // если есть дробная часть и оно не NaN отменяем диспатч
        if (!isFloated && isNaN(+value)) return;

        dispatch(
            setField({
                field: "cycles",
                value: {
                    ...cycles,
                    fixed_price: !isFloated ? "" + +value : value,
                },
            })
        );
    };

    // correction in useState
    const [correction, setCorrection] = useState(cycles.correction);

    const handleCorrection = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        setCorrection(value);

        const isFloated = value.split(".")[1] !== "";
        // если есть дробная часть и оно не NaN отменяем диспатч
        if (!isFloated && isNaN(+value)) return;

        dispatch(
            setField({
                field: "cycles",
                value: {
                    ...cycles,
                    correction: !isFloated ? "" + +value : value,
                },
            })
        );
    };

    // fixed amount in useState
    const [fixedAmount, setFixedAmount] = useState(cycles.fixed_amount);

    const handleFixedAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        setFixedAmount(value);

        const isFloated = value.split(".")[1] !== "";
        // если есть дробная часть и оно не NaN отменяем диспатч
        if (!isFloated && isNaN(+value)) return;

        dispatch(
            setField({
                field: "cycles",
                value: {
                    ...cycles,
                    fixed_amount: !isFloated ? "" + +value : value,
                },
            })
        );
    };

    const validation = () => {
        if (cycles.count > 1) {
            if (
                cycles.input_type === "FIXED" &&
                (cycles.fixed_price === "" || +cycles.fixed_price <= 0)
            ) {
                dispatch(
                    addAlert({
                        title: 'The "Price" field value must be greater than 0',
                    })
                );
                return false;
            }

            if (
                cycles.input_type === "CORRECTION" &&
                (cycles.correction === "" ||
                    +cycles.correction <= 0 ||
                    +cycles.correction > 100)
            ) {
                dispatch(
                    addAlert({
                        title: "The value of the “Corretion” field must be greater than 0, but not greater than 100",
                    })
                );
                return false;
            }

            if (
                cycles.amount_type === "FIXED" &&
                (cycles.fixed_amount === "" || +cycles.fixed_amount <= 0)
            ) {
                dispatch(
                    addAlert({
                        title: 'The "Entry volume" field value must be greater than 0',
                    })
                );
                return false;
            }
        }

        return true;
    };

    const rangeData = useRange(1, 10, cycles.count);

    const handleCyclesSwitch = () => {
        dispatch(
            setField({
                field: "otherStates",
                value: { ...otherStates, cycles: !otherStates.cycles },
            })
        );
    };

    const handleInputTypeSwitch = (item: {
        title: string;
        id: BotModel["cycles"]["input_type"];
    }) => {
        dispatch(
            setField({
                field: "cycles",
                value: {
                    ...cycles,
                    input_type: item.id,
                },
            })
        );
    };

    const hanldeAmountTypeSwitch = (item: {
        title: string;
        id: BotModel["cycles"]["amount_type"];
    }) => {
        dispatch(
            setField({
                field: "cycles",
                value: {
                    ...cycles,
                    amount_type: item.id,
                },
            })
        );
    };

    useEffect(() => {
        const backButtonHandler = () => {
            window.history.back();
        };
        tgApp.BackButton.onClick(backButtonHandler);

        tgApp.MainButton.show();
        tgApp.MainButton.text = "Next to step 6 / 6";
        tgApp.MainButton.color = "#007AFF";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
        };
    }, []);

    useEffect(() => {
        dispatch(
            setField({
                field: "cycles",
                value: {
                    ...cycles,
                    count: rangeData.value,
                },
            })
        );
    }, [rangeData.value]);

    useEffect(() => {
        if (!otherStates.cycles) {
            rangeData.setValue(1);
        }
    }, [otherStates.cycles]);

    useEffect(() => {
        const mainButtonHandler = () => {
            if (validation()) {
                dispatch(deleteAlert());
                navigate("/createbot/step6"); // тут изменить
            }
        };
        tgApp.MainButton.onClick(mainButtonHandler);

        return () => {
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, [cycles]);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h1 className={styles.top_title}>Duration</h1>
                <p className={styles.top_subtitle}>
                    Select the type of trading for detailed bot setup
                </p>
            </div>

            <Cell description="Dynamic pricing is adjusting prices based on external elements such as demand, supply, market, and customer behavior.">
                <CellListItem>
                    <p className={styles.switch_title}>Full сycles</p>
                    <Switcher
                        switchData={{
                            state: otherStates.cycles,
                            handle: handleCyclesSwitch,
                        }}
                    />
                </CellListItem>
                <CellListItem
                    className={clsx(styles.wrapper, {
                        [styles.wrapper__active]: otherStates.cycles,
                    })}
                    topBottomPadding={otherStates.cycles ? undefined : 0}
                >
                    <div className={styles.progress}>
                        <FlexWrapper className={styles.progress_top}>
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <span>6</span>
                            <span>7</span>
                            <span>8</span>
                            <span>9</span>
                            <span>10</span>
                        </FlexWrapper>
                        <div className={styles.rangeSlider}>
                            <input
                                ref={rangeData.innerRef}
                                value={rangeData.value}
                                onChange={({ target: { value: radius } }) =>
                                    rangeData.setValue(+radius)
                                }
                                type="range"
                                min={1}
                                max={10}
                                step={1}
                                className={styles.rangeSlider_input}
                            />
                            <div
                                style={{
                                    left: rangeData.offset + "%",
                                }}
                                className={styles.rangeSlider_bubble}
                            ></div>
                            <div
                                style={{ width: rangeData.offset + "%" }}
                                className={styles.rangeSlider_line}
                            ></div>
                            <div className={styles.rangeSlider_elements}>
                                {[...Array(10)].map((_, index) => {
                                    return (
                                        <span
                                            key={index}
                                            style={{
                                                borderColor: "#f2f2f7",
                                            }}
                                        ></span>
                                    );
                                })}
                            </div>
                            <div
                                style={{
                                    clipPath: `polygon(0 0, ${rangeData.offset}% 0, ${rangeData.offset}% 100%, 0% 100%)`,
                                }}
                                className={styles.rangeSlider_activeElements}
                            >
                                {[...Array(10)].map((_, index) => {
                                    return (
                                        <span
                                            key={index}
                                            style={{
                                                borderColor: "#007AFF",
                                            }}
                                        ></span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </CellListItem>
            </Cell>

            {cycles.count > 1 && (
                <>
                    <Cell title="Settings nexts inputs">
                        <CellListItem>
                            Price definition type
                            <Dropdown
                                onSwitch={handleInputTypeSwitch}
                                disabledIsClicked={false}
                                disabledIsMarked={true}
                                defaultValueIndex={settingNextDropdown.findIndex(
                                    (item) => item.id === cycles.input_type
                                )}
                                items={settingNextDropdown}
                            />
                        </CellListItem>
                        {cycles.input_type === "FIXED" && (
                            <CellListItem>
                                <p className={styles.listItem_title}>Price</p>
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    className={styles.listItem_input}
                                    onFocus={handleInputFocus}
                                    onClick={handleInputScroll}
                                    onChange={handleFixedPrice}
                                    value={fixedPrice}
                                />
                            </CellListItem>
                        )}
                        {cycles.input_type === "CORRECTION" && (
                            <CellListItem>
                                <p className={styles.listItem_title}>
                                    Correction, %
                                </p>
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    className={styles.listItem_input}
                                    onFocus={handleInputFocus}
                                    onClick={handleInputScroll}
                                    onChange={handleCorrection}
                                    value={correction}
                                />
                            </CellListItem>
                        )}
                    </Cell>

                    <Cell>
                        <CellListItem>
                            Volume definition type
                            <Dropdown
                                onSwitch={hanldeAmountTypeSwitch}
                                defaultValueIndex={definitionTypeDropdown.findIndex(
                                    (item) => item.id === cycles.amount_type
                                )}
                                items={definitionTypeDropdown}
                            />
                        </CellListItem>
                        {cycles.amount_type === "FIXED" && (
                            <CellListItem>
                                <p className={styles.listItem_title}>
                                    Entry volume
                                </p>
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    className={styles.listItem_input}
                                    onFocus={handleInputFocus}
                                    onClick={handleInputScroll}
                                    onChange={handleFixedAmount}
                                    value={fixedAmount}
                                    max={99}
                                />
                            </CellListItem>
                        )}
                    </Cell>
                </>
            )}
        </div>
    );
};
