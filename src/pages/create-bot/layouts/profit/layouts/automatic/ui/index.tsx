import { FC } from "react";
import styles from "./style.module.scss";
import { Cell, CellListItem, Range, Switcher } from "shared/ui";
import { useSwitch } from "shared/lib";
import clsx from "clsx";

export const AutomaticLayout: FC = () => {
    const stepTakeSwitch = useSwitch();
    const martingaleSwitch = useSwitch();

    return (
        <>
            <Cell title="Take Profit">
                <CellListItem>
                    <p className={styles.blockList_item_title}>
                        Take Profit, %
                    </p>
                    <span className={styles.blockList_item_span}>10</span>
                </CellListItem>
                <CellListItem>
                    <p className={styles.blockList_item_title}>
                        First Take Profit quantity, %
                    </p>
                    <span className={styles.blockList_item_span}>30</span>
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
                    <Range min="1.0" max="5" currValue={2} />
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
                    <Range min="0.1" max="5" currValue={1.4} step={0.1} />
                </CellListItem>
            </Cell>
        </>
    );
};
