import { FC, useState, useEffect } from "react";
import styles from "./style.module.scss";
import { Cell, CellListItem, Range, Switcher } from "shared/ui";
import { handleInputFocus, handleInputScroll } from "shared/lib";
import clsx from "clsx";
import { useBot } from "pages/create-bot/libs";
import { inputNumber } from "features/input-number";
import { useRange } from "shared/ui/range/libs/use-range";

export const AutomaticLayout: FC = () => {
    const {
        bot: { take_profit, take_amount, take_step, take_mrt },
        setBot,
        otherStates,
        setOtherStates,
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

    const handleTakeStepSwitch = () => {
        setOtherStates((prevState) => ({
            ...prevState,
            take_step: !prevState.take_step,
        }));
    };

    const handleTakeMrtSwitch = () => {
        console.log("take_mrt", take_mrt);
        setOtherStates((prevState) => ({
            ...prevState,
            take_mrt: !prevState.take_mrt,
        }));
    };

    const takeStepData = useRange(1, 5, take_step);
    const takeMrtData = useRange(1, 5, take_mrt);

    useEffect(() => {
        if (!otherStates.take_step) {
            handleTStepChange(1);
            takeStepData.setValue(1);
        }
        if (!otherStates.take_mrt) {
            handleTMrtChange(1);
            takeMrtData.setValue(1);
        }
    }, [otherStates]);

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
                        min="1.0"
                        max="5"
                        step={0.1}
                        currValue={take_step}
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
                        min="1.0"
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
