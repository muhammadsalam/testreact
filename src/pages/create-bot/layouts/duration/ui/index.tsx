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
import { deleteAlert } from "entities/notification";
import { setField } from "pages/create-bot";

const settingNextDropdown = [
    {
        title: "For a price",
        id: "FOR_PRICE",
    },
    {
        title: "On correction",
        id: "ON_CORRECTION",
    },
    {
        title: "By indicator",
        id: "BY_INDICATOR",
        disabled: true,
    },
];

const definitionTypeDropdown = [
    {
        title: "Percent",
        id: "PERCENT",
    },
    {
        title: "Fixed volume",
        id: "FIXED",
    },
];

export const DurationLayout: FC = () => {
    const navigate = useNavigate();
    const dispatch: Dispatch<any> = useDispatch();
    const { cycles, active_buy, active_def, active_tp, otherStates } =
        useSelector((state: RootState) => state.newBot);

    const [durPrice, setDurPrice] = useState("");
    const handleDurPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDurPrice(e.target.value);
    };

    const [durAmount, setDurAmount] = useState("");
    const handleDurAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDurAmount(e.target.value);
    };

    const validation = () => {
        return true;
    };

    useEffect(() => {
        const backButtonHandler = () => {
            window.history.back();
        };
        tgApp.BackButton.onClick(backButtonHandler);

        const mainButtonHandler = () => {
            if (validation()) {
                dispatch(deleteAlert());
                navigate("/createbot/step6"); // тут изменить
            }
        };
        tgApp.MainButton.onClick(mainButtonHandler);

        tgApp.MainButton.text =
            "Next to step " +
            (3 + +active_buy + +active_def + +active_tp) +
            " / " +
            (3 + +active_buy + +active_def + +active_tp);
        tgApp.MainButton.color = "#007AFF";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, [active_buy, active_def, active_tp, otherStates.cycles]);

    const rangeData = useRange(1, 10, cycles);

    useEffect(() => {
        dispatch(setField({ field: "cycles", value: rangeData.value }));
    }, [rangeData.value]);

    useEffect(() => {
        if (!otherStates.cycles) {
            rangeData.setValue(1);
        }
    }, [otherStates]);

    const handleCyclesSwitch = () => {
        dispatch(
            setField({
                field: "otherStates",
                value: { ...otherStates, cycles: !otherStates.cycles },
            })
        );
    };

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

            <Cell title="Settings nexts inputs">
                <CellListItem>
                    Price definition type
                    <Dropdown
                        disabledIsClicked={false}
                        disabledIsMarked={true}
                        defaultValueIndex={settingNextDropdown.findIndex(
                            (item) => item.id === "FOR_PRICE"
                        )}
                        items={settingNextDropdown}
                    />
                </CellListItem>
                <CellListItem>
                    <p className={styles.listItem_title}>Price</p>
                    <input
                        type="number"
                        inputMode="numeric"
                        className={styles.listItem_input}
                        onFocus={handleInputFocus}
                        onClick={handleInputScroll}
                        onChange={handleDurPrice}
                        value={durPrice}
                    />
                </CellListItem>
            </Cell>

            <Cell>
                <CellListItem>
                    Volume definition type
                    <Dropdown
                        onSwitch={(item) =>
                            dispatch(
                                setField({
                                    field: "def_type",
                                    value: item,
                                })
                            )
                        }
                        defaultValueIndex={definitionTypeDropdown.findIndex(
                            (item) => item.id === "PERCENT"
                        )}
                        items={definitionTypeDropdown}
                    />
                </CellListItem>
                <CellListItem>
                    <p className={styles.listItem_title}>Entry volume, %</p>
                    <input
                        type="number"
                        inputMode="numeric"
                        className={styles.listItem_input}
                        onFocus={handleInputFocus}
                        onClick={handleInputScroll}
                        onChange={handleDurAmount}
                        value={durAmount}
                        max={99}
                    />
                </CellListItem>
            </Cell>
        </div>
    );
};
