import ArrowRightIcon from "../../../../../../../assets/icons/arrow.svg?react";
import { Cell, FlexWrapper, Range, Switcher } from "shared/ui";
import styles from "./style.module.scss";
import clsx from "clsx";

export const InsuranceOrdersLayout = () => {
    return (
        <>
            <Cell title="Type of insurance order">
                <button className={styles.navButton_button}>
                    Market Order
                    <ArrowRightIcon className={styles.navButton_icon} />
                </button>
            </Cell>

            <Cell>
                <div className={styles.blockList_item}>
                    <FlexWrapper>
                        <p className={styles.blockList_item_title}>
                            Limit of insurance orders
                        </p>
                        <span className={styles.blockList_item_span}>10</span>
                    </FlexWrapper>
                </div>
                <div className={styles.blockList_item}>
                    <FlexWrapper>
                        <p className={styles.blockList_item_title}>
                            Step of insurance orders, %
                        </p>
                        <span className={styles.blockList_item_span}>2</span>
                    </FlexWrapper>
                </div>
            </Cell>

            <Cell description=" The Martingale system is a system in which the dollar value of trades increases after losses, or position size increases with a smaller portfolio size.">
                <div className={clsx(styles.blockList_item, styles.switch)}>
                    <FlexWrapper>
                        <p className={styles.switch_title}>Martingale</p>
                        <Switcher />
                    </FlexWrapper>
                </div>
                <div className={styles.blockList_item}>
                    <Range min={"0.1"} max={"5"} currValue={3.5} />
                </div>
            </Cell>

            <Cell description="The price level of each next order changes according to the specified coefficient">
                <div className={clsx(styles.blockList_item, styles.switch)}>
                    <FlexWrapper>
                        <p className={styles.switch_title}>
                            Dynamic price step CO
                        </p>
                        <Switcher />
                    </FlexWrapper>
                </div>
                <div className={styles.blockList_item}>
                    <Range min={"1.0"} max={"5"} currValue={2} />
                </div>
            </Cell>
        </>
    );
};
