import ArrowRightIcon from "../../../../../../../assets/icons/arrow.svg?react";
import { Cell, CellListItem, Range, Switcher } from "shared/ui";
import styles from "./style.module.scss";
import { useSwitch } from "shared/lib";
import clsx from "clsx";

export const InsuranceOrdersLayout = () => {
    const martingaleSwitch = useSwitch();
    const dynamicPriceSwitch = useSwitch();
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
                    <p className={styles.blockList_item_title}>
                        Limit of insurance orders
                    </p>
                    <span className={styles.blockList_item_span}>10</span>
                </CellListItem>
                <CellListItem>
                    <p className={styles.blockList_item_title}>
                        Step of insurance orders, %
                    </p>
                    <span className={styles.blockList_item_span}>2</span>
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
                    <Range min={"0.1"} max={"5"} currValue={3.5} />
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
                    <Range min={"1.0"} max={"5"} currValue={2} />
                </CellListItem>
            </Cell>
        </>
    );
};
