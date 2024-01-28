import ArrowRightIcon from "../../../../../../../assets/icons/arrow.svg?react";
import { Cell, CellListItem, Range, Switcher } from "shared/ui";
import styles from "./style.module.scss";
import { handleInputFocus, handleInputScroll, useSwitch } from "shared/lib";
import clsx from "clsx";
import { useBot } from "pages/create-bot/libs";
import { useState } from "react";
import { inputNumber } from "features/input-number";

export const InsuranceOrdersLayout = () => {
    const martingaleSwitch = useSwitch();
    const dynamicPriceSwitch = useSwitch();

    const {
        bot: { io_count, io_step, io_mrt, io_step_mrt },
        setBot,
    } = useBot();

    const [IOCount, SetIOCount] = useState("" + io_count);
    const handleIOCount = (e: React.ChangeEvent<HTMLInputElement>) => {
        inputNumber(e.target.value, SetIOCount, setBot, "io_count");
    };

    const [IOStep, SetIOStep] = useState("" + io_step);
    const handleIOStep = (e: React.ChangeEvent<HTMLInputElement>) => {
        inputNumber(e.target.value, SetIOStep, setBot, "io_step");
    };

    const handleIOMrt = (value: number) => {
        setBot((prevState) => {
            return { ...prevState, io_mrt: value };
        });
    };

    const handleIOStepMrt = (value: number) => {
        setBot((prevState) => {
            return { ...prevState, io_step_mrt: value };
        });
    };

    return (
        <>
            <Cell title="Type of insurance order">
                <button className={styles.navButton_button}>
                    Market Order
                    <ArrowRightIcon className={styles.navButton_icon} />
                </button>
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
                    />
                </CellListItem>
            </Cell>

            <Cell description=" The Martingale system is a system in which the dollar value of trades increases after losses, or position size increases with a smaller portfolio size.">
                <CellListItem color="#000">
                    <p className={styles.switch_title}>Martingale</p>
                    <Switcher switchData={martingaleSwitch} />
                </CellListItem>
                <CellListItem
                    className={clsx(styles.wrapper, {
                        [styles.wrapper__active]: martingaleSwitch.state,
                    })}
                    topBottomPadding={martingaleSwitch.state ? undefined : 0}
                >
                    <Range
                        min={"0.1"}
                        max={"5"}
                        currValue={io_mrt}
                        step={0.1}
                        handle={handleIOMrt}
                    />
                </CellListItem>
            </Cell>

            <Cell description="The price level of each next order changes according to the specified coefficient">
                <CellListItem>
                    <p className={styles.switch_title}>Dynamic price step CO</p>
                    <Switcher switchData={dynamicPriceSwitch} />
                </CellListItem>
                <CellListItem
                    className={clsx(styles.wrapper, {
                        [styles.wrapper__active]: dynamicPriceSwitch.state,
                    })}
                    topBottomPadding={dynamicPriceSwitch.state ? undefined : 0}
                >
                    <Range
                        min={"1.0"}
                        max={"5"}
                        currValue={io_step_mrt}
                        handle={handleIOStepMrt}
                    />
                </CellListItem>
            </Cell>
        </>
    );
};
