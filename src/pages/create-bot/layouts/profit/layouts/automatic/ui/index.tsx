import { FC } from "react";
import styles from "./style.module.scss";
import { Cell, FlexWrapper, Range, Switcher } from "shared/ui";

export const AutomaticLayout: FC = () => {
    return (
        <>
            <Cell title="Take Profit">
                <FlexWrapper className={styles.blockList_item}>
                    <p className={styles.blockList_item_title}>
                        Take Profit, %
                    </p>
                    <span className={styles.blockList_item_span}>10</span>
                </FlexWrapper>
                <FlexWrapper className={styles.blockList_item}>
                    <p className={styles.blockList_item_title}>
                        First Take Profit quantity, %
                    </p>
                    <span className={styles.blockList_item_span}>30</span>
                </FlexWrapper>
            </Cell>

            <Cell description="Step Take Profit is a tool that automatically sells a portion of assets when certain price levels are reached to lock in profits in stages.">
                <FlexWrapper className={styles.blockList_item}>
                    <p className={styles.switch_title}>Step Take Profit</p>
                    <Switcher />
                </FlexWrapper>
                <FlexWrapper className={styles.blockList_item}>
                    <Range min="1.0" max="5" currValue={2} />
                </FlexWrapper>
            </Cell>

            <Cell description="Martingale is a trading tool in which the trade size increases after each correction to average price.">
                <FlexWrapper className={styles.blockList_item}>
                    <p className={styles.switch_title}>Martingale</p>
                    <Switcher />
                </FlexWrapper>
                <FlexWrapper className={styles.blockList_item}>
                    <Range min="0.1" max="5" currValue={1.4} step={0.1} />
                </FlexWrapper>
            </Cell>
        </>
    );
};
