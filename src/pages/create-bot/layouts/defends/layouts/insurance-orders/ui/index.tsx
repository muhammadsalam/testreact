import { Cell, CellListItem, Dropdown, Range, Switcher } from "shared/ui";
import styles from "./style.module.scss";
import { handleInputFocus, handleInputScroll } from "shared/lib";
import clsx from "clsx";
import { useState, useEffect } from "react";
import { useRange } from "shared/ui/range/libs/use-range";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/AppStore";
import { Dispatch } from "@reduxjs/toolkit";
import { BotModel, setField } from "pages/create-bot";

export const inputTypesDropdown: {
    title: string;
    id: BotModel["io_calculate_type"];
}[] = [
    { title: "From the fisrt order", id: "LO" },
    { title: "From average price", id: "AO" },
];

export const InsuranceOrdersLayout = () => {
    const {
        io_calculate_type,
        io_count,
        io_step,
        io_mrt,
        io_step_mrt,
        otherStates,
    } = useSelector((state: RootState) => state.newBot);
    const dispatch: Dispatch<any> = useDispatch();

    const [IOCount, SetIOCount] = useState("" + io_count);
    const handleIOCount = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(",", ".");
        if (isNaN(+value) || value.includes(".")) return;

        if (value.startsWith("0") && value.length > 1) {
            value = value.slice(1);
            e.target.value = value;
        }

        SetIOCount(value);
        const isFloated = value.split(".")[1] !== "";
        // если есть дробная часть и оно не NaN отменяем диспатч
        if (!isFloated && isNaN(+value)) return;
        dispatch(
            setField({
                field: "io_count",
                value: !isFloated ? "" + +value : value,
            })
        );
    };

    const [IOStep, SetIOStep] = useState("" + io_step);
    const handleIOStep = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        SetIOStep(value);
        const isFloated = value.split(".")[1] !== "";
        // если есть дробная часть и оно не NaN отменяем диспатч
        if (!isFloated && isNaN(+value)) return;
        dispatch(
            setField({
                field: "io_step",
                value: !isFloated ? "" + +value : value,
            })
        );
    };

    const handleMartingaleSwitch = () => {
        dispatch(
            setField({
                field: "otherStates",
                value: { ...otherStates, def_mrt: !otherStates.def_mrt },
            })
        );
    };

    const handleDynamicPriceSwitch = () => {
        dispatch(
            setField({
                field: "otherStates",
                value: {
                    ...otherStates,
                    def_step_mrt: !otherStates.def_step_mrt,
                },
            })
        );
    };

    const handleIOMrt = (value: string) => {
        dispatch(setField({ field: "io_mrt", value: value }));
    };

    const handleIOStepMrt = (value: string) => {
        dispatch(setField({ field: "io_step_mrt", value: value }));
    };

    const martingaleRangeData = useRange(0.5, 5, +io_mrt);
    const dynamicPriceRangeData = useRange(0.5, 5, +io_step_mrt);

    const handleInputTypeChange = (item: {
        id: BotModel["io_calculate_type"];
    }) => {
        dispatch(setField({ field: "io_calculate_type", value: item.id }));
    };

    useEffect(() => {
        if (!otherStates.def_mrt) {
            handleIOMrt("1");
            martingaleRangeData.setValue(1);
        }

        if (!otherStates.def_step_mrt) {
            handleIOStepMrt("1");
            dynamicPriceRangeData.setValue(1);
        }
    }, [otherStates]);

    return (
        <>
            <Cell>
                <CellListItem>
                    Input type
                    <Dropdown
                        onSwitch={handleInputTypeChange}
                        defaultValueIndex={inputTypesDropdown.findIndex(
                            (item) => item.id === io_calculate_type
                        )}
                        items={inputTypesDropdown}
                    />
                </CellListItem>
            </Cell>

            <Cell>
                <CellListItem>
                    <p className={styles.listItem_title}>
                        Limit of insurance orders
                    </p>

                    <input
                        type="text"
                        className={styles.listItem_input}
                        inputMode="decimal"
                        onFocus={handleInputFocus}
                        onClick={handleInputScroll}
                        onChange={handleIOCount}
                        value={IOCount}
                        max={10}
                    />
                </CellListItem>
                <CellListItem>
                    <p className={styles.listItem_title}>
                        Step of insurance orders, %
                    </p>
                    <input
                        type="text"
                        inputMode="decimal"
                        className={styles.listItem_input}
                        onFocus={handleInputFocus}
                        onClick={handleInputScroll}
                        onChange={handleIOStep}
                        value={IOStep}
                        max={99}
                    />
                </CellListItem>
            </Cell>

            <Cell description=" The Martingale system is a system in which the dollar value of trades increases after losses, or position size increases with a smaller portfolio size.">
                <CellListItem color="#000">
                    <p className={styles.switch_title}>Martingale</p>
                    <Switcher
                        switchData={{
                            state: otherStates.def_mrt,
                            handle: handleMartingaleSwitch,
                        }}
                    />
                </CellListItem>
                <CellListItem
                    className={clsx(styles.wrapper, {
                        [styles.wrapper__active]: otherStates.def_mrt,
                    })}
                    topBottomPadding={otherStates.def_mrt ? undefined : 0}
                >
                    <Range
                        {...martingaleRangeData}
                        min={"0.5"}
                        max={"5"}
                        currvalue={+io_mrt}
                        step={0.1}
                        handle={handleIOMrt}
                    />
                </CellListItem>
            </Cell>

            <Cell description="The price level of each next order changes according to the specified coefficient">
                <CellListItem>
                    <p className={styles.switch_title}>Dynamic price step CO</p>
                    <Switcher
                        switchData={{
                            state: otherStates.def_step_mrt,
                            handle: handleDynamicPriceSwitch,
                        }}
                    />
                </CellListItem>
                <CellListItem
                    className={clsx(styles.wrapper, {
                        [styles.wrapper__active]: otherStates.def_step_mrt,
                    })}
                    topBottomPadding={otherStates.def_step_mrt ? undefined : 0}
                >
                    <Range
                        {...dynamicPriceRangeData}
                        min={"0.5"}
                        max={"5"}
                        step={0.1}
                        currvalue={+io_step_mrt}
                        handle={handleIOStepMrt}
                    />
                </CellListItem>
            </Cell>
        </>
    );
};
