import { Cell } from "shared/ui";
import styles from "./style.module.scss";
import clsx from "clsx";

export const OpenOrderCard = () => {
    return (
        <Cell title="Open orders" listClassName={styles.wrapper}>
            <div className={styles.top}>
                <div className={styles.top_item}>
                    <span className={styles.top_item_subtitle}>
                        Coin balance
                    </span>
                    <strong className={styles.top_item_title}>
                        0.0012 BTC
                    </strong>
                </div>
                <div className={styles.top_item}>
                    <span className={styles.top_item_subtitle}>Cycle</span>
                    <strong className={styles.top_item_title}>2 / 5</strong>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.content_item}>
                    <div className={styles.content_item_row}>
                        <div className={styles.content_item_index}></div>
                        <span className={styles.content_item_sub}>
                            Buy order
                        </span>
                        <span className={styles.content_item_sub}>
                            % to fulfilment
                        </span>
                        <span className={styles.content_item_sub}>
                            Order type
                        </span>
                    </div>
                    {new Array(2).fill(0).map((_, index) => (
                        <div className={styles.content_item_row} key={index}>
                            <div
                                className={clsx(
                                    styles.content_item_index,
                                    "confirm_color"
                                )}
                            >
                                {index + 1}
                            </div>
                            <span className={styles.content_item_title}>
                                64 919
                            </span>
                            <span className={styles.content_item_title}>
                                -2,25 %
                            </span>
                            <span className={styles.content_item_title}>
                                Insurance
                            </span>
                        </div>
                    ))}
                </div>
                <div className={styles.content_item}>
                    <div
                        className={styles.content_item_row}
                        style={{ marginBottom: "-4px" }}
                    >
                        <div></div>
                        <span className={styles.content_item_sub}>
                            Market price
                        </span>
                    </div>
                    {new Array(1).fill(0).map((_, index) => (
                        <div className={styles.content_item_row} key={index}>
                            <div></div>
                            <span className={styles.content_item_title}>
                                66 919 USDT
                            </span>
                        </div>
                    ))}
                </div>
                <div className={styles.content_item}>
                    <div className={styles.content_item_row}>
                        <div></div>
                        <span className={styles.content_item_sub}>
                            Sell order
                        </span>
                        <span className={styles.content_item_sub}>
                            % to fulfilment
                        </span>
                        <span className={styles.content_item_sub}>
                            Order type
                        </span>
                    </div>
                    {new Array(2).fill(0).map((_, index) => (
                        <div className={styles.content_item_row} key={index}>
                            <div
                                className={clsx(
                                    styles.content_item_index,
                                    "destructive_color"
                                )}
                            >
                                {index + 1}
                            </div>
                            <span className={styles.content_item_title}>
                                67 919
                            </span>
                            <span className={styles.content_item_title}>
                                -2,25 %
                            </span>
                            <span className={styles.content_item_title}>
                                Take Profit
                            </span>
                        </div>
                    ))}
                </div>
                <div className={styles.content_item}>
                    <div className={styles.content_item_row}>
                        <div className={styles.content_item_index}></div>
                        <span className={styles.content_item_sub}>
                            Stop Loss
                        </span>
                        <span className={styles.content_item_sub}>
                            % to fulfilment
                        </span>
                        <span className={styles.content_item_sub}>
                            Order type
                        </span>
                    </div>
                    {new Array(1).fill(0).map((_, index) => (
                        <div className={styles.content_item_row} key={index}>
                            <div
                                className={clsx(
                                    styles.content_item_index,
                                    "destructive_color"
                                )}
                            >
                                {index + 1}
                            </div>
                            <span className={styles.content_item_title}>
                                40 000
                            </span>
                            <span className={styles.content_item_title}>
                                -30 %
                            </span>
                            <span className={styles.content_item_title}>
                                Stop Loss
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </Cell>
    );
};
