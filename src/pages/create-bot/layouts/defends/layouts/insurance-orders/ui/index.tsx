import { Cell, CellListItem, Range, Switcher } from "shared/ui";
import styles from "./style.module.scss";
import { handleInputFocus, handleInputScroll } from "shared/lib";
import clsx from "clsx";
import { useBot } from "pages/create-bot/libs";
import { useState, useEffect } from "react";
import { inputNumber } from "features/input-number";
import { useRange } from "shared/ui/range/libs/use-range";

export const InsuranceOrdersLayout = () => {
    const {
        bot: { io_count, io_step, io_mrt, io_step_mrt },
        setBot,
        setOtherStates,
        otherStates,
    } = useBot();

    const [IOCount, SetIOCount] = useState("" + io_count);
    const handleIOCount = (e: React.ChangeEvent<HTMLInputElement>) => {
        inputNumber(e.target.value, SetIOCount, setBot, "io_count", 10);
    };

    const [IOStep, SetIOStep] = useState("" + io_step);
    const handleIOStep = (e: React.ChangeEvent<HTMLInputElement>) => {
        inputNumber(e.target.value, SetIOStep, setBot, "io_step");
    };

    const handleMartingaleSwitch = () => {
        setOtherStates((prevState) => ({
            ...prevState,
            def_mrt: !prevState.def_mrt,
        }));
    };

    const handleDynamicPriceSwitch = () => {
        setOtherStates((prevState) => ({
            ...prevState,
            def_step_mrt: !prevState.def_step_mrt,
        }));
    };

    const handleIOMrt = (value: string) => {
        setBot((prevState) => {
            return { ...prevState, io_mrt: value };
        });
    };

    const handleIOStepMrt = (value: string) => {
        setBot((prevState) => {
            return { ...prevState, io_step_mrt: value };
        });
    };

    const martingaleRangeData = useRange(1, 5, +io_mrt);
    const dynamicPriceRangeData = useRange(1, 5, +io_step_mrt);

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
            <Cell title="Type of insurance order">
                <div className={styles.navButton_button}>Market Order</div>
            </Cell>

            <Cell>
                <CellListItem>
                    <p className={styles.listItem_title}>
                        Limit of insurance orders
                    </p>

                    <input
                        type="number"
                        className={styles.listItem_input}
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
                        type="number"
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
                        min={"1.0"}
                        max={"5"}
                        currValue={+io_mrt}
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
                        min={"1.0"}
                        max={"5"}
                        step={0.1}
                        currValue={+io_step_mrt}
                        handle={handleIOStepMrt}
                    />
                </CellListItem>
            </Cell>
        </>
    );
};
