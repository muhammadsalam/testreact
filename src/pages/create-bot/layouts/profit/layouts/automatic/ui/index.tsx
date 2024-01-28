import { FC, useState } from "react";
import styles from "./style.module.scss";
import { Cell, CellListItem, Range, Switcher } from "shared/ui";
import { handleInputFocus, handleInputScroll, useSwitch } from "shared/lib";
import clsx from "clsx";
import { useBot } from "pages/create-bot/libs";
import { inputNumber } from "features/input-number";

export const AutomaticLayout: FC = () => {
    const stepTakeSwitch = useSwitch();
    const martingaleSwitch = useSwitch();

    const {
        bot: { take_profit, take_amount, take_step, take_mrt },
        setBot,
    } = useBot();

    const [TProfit, setTProfit] = useState("" + take_profit);
    const handleTProfitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        inputNumber(e.target.value, setTProfit, setBot, "take_profit");
    };

    const [TAmount, setTAmount] = useState("" + take_amount);
    const handleTAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        inputNumber(e.target.value, setTAmount, setBot, "take_amount");
    };

    const handleTStepChange = (value: number) => {
        setBot((prevState) => {
            return { ...prevState, take_step: value };
        });
    };

    const handleTMrtChange = (value: number) => {
        setBot((prevState) => {
            return { ...prevState, take_mrt: value };
        });
    };

    return (
        <>
            <Cell title="Take Profit">
                <CellListItem>
                    <p className={styles.listItem_title}>Take Profit, %</p>
                    <input
                        type="number"
                        className={styles.listItem_input}
                        onFocus={handleInputFocus}
                        onClick={handleInputScroll}
                        value={TProfit}
                        onChange={handleTProfitChange}
                    />
                </CellListItem>
                <CellListItem>
                    <p className={styles.listItem_title}>
                        First Take Profit quantity, %
                    </p>
                    <input
                        type="number"
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
                    <Switcher switchData={stepTakeSwitch} />
                </CellListItem>
                <CellListItem
                    className={clsx(styles.wrapper, {
                        [styles.wrapper__active]: stepTakeSwitch.state,
                    })}
                    topBottomPadding={stepTakeSwitch.state ? undefined : 0}
                >
                    <Range
                        min="1.0"
                        max="5"
                        currValue={take_step}
                        handle={handleTStepChange}
                    />
                </CellListItem>
            </Cell>

            <Cell description="Martingale is a trading tool in which the trade size increases after each correction to average price.">
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
                        min="0.1"
                        max="5"
                        currValue={take_mrt}
                        step={0.1}
                        handle={handleTMrtChange}
                    />
                </CellListItem>
            </Cell>
        </>
    );
};
