import { Cell, CellListItem } from "shared/ui";
import styles from "./style.module.scss";
import WaitIcon from "icons/order-wait.svg?react";
import CanceledIcon from "icons/order-canceled.svg?react";
import ExecutedIcon from "icons/order-executed.svg?react";
import clsx from "clsx";
import { OrderHistoryModal } from "../order-history-modal";
import { useState } from "react";
import { OrderHistoryDropdown } from "../order-history-dropdown";

type OrderHistoryModalProps = {
    status: string;
    title: string;
    data: string;
};

export const OrderHistory = () => {
    const [orderHistoryActive, setOrderHistoryActive] =
        useState<OrderHistoryModalProps | null>(null);

    const handleHistoryModalClose = () => {
        setOrderHistoryActive(null);
    };

    const handleOpenOrderHistoryModal = (item: OrderHistoryModalProps) => {
        setOrderHistoryActive(item);
    };

    return (
        <>
            <div className={styles.filters}>
                <OrderHistoryDropdown
                    style={{ maxWidth: "72px" }}
                    title="Cycle"
                    items={[
                        "All",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                    ]}
                />
                <OrderHistoryDropdown
                    title="Status"
                    items={[
                        "All",
                        "Executed",
                        "Canceled",
                        "Wait",
                        "Ready to placed",
                        "Ready to canceled",
                        "Created",
                    ]}
                />
                <OrderHistoryDropdown
                    title="Order type"
                    items={[
                        "All",
                        "First order",
                        "Take profit",
                        "Insurance",
                        "Stop loss",
                    ]}
                />
            </div>
            <Cell title="Order history" listClassName={styles.history}>
                <CellListItem topBottomPadding={10} className={styles.listItem}>
                    <button
                        onClick={() =>
                            handleOpenOrderHistoryModal({
                                status: "Wait",
                                title: "Insurance",
                                data: "20.04.24 15:21",
                            })
                        }
                    ></button>
                    <WaitIcon />
                    <div className={styles.listItem_wrapper}>
                        <div className={styles.listItem_block}>
                            <strong className={styles.listItem_title}>
                                Insurance
                            </strong>
                            <span className={styles.listItem_sub}>
                                + 0,01 BTC
                            </span>
                        </div>
                        <div className={styles.listItem_block}>
                            <strong className={styles.listItem_status}>
                                Wait
                            </strong>
                            <span className={styles.listItem_data}>
                                20.04.24 15:21
                            </span>
                        </div>
                    </div>
                </CellListItem>
                <CellListItem topBottomPadding={10} className={styles.listItem}>
                    <button
                        onClick={() =>
                            handleOpenOrderHistoryModal({
                                status: "Ready to placed",
                                title: "Insurance",
                                data: "20.04.24 15:21",
                            })
                        }
                    ></button>
                    <WaitIcon />
                    <div className={styles.listItem_wrapper}>
                        <div className={styles.listItem_block}>
                            <strong className={styles.listItem_title}>
                                Insurance
                            </strong>
                            <span className={styles.listItem_sub}>
                                + 0,01 BTC
                            </span>
                        </div>
                        <div className={styles.listItem_block}>
                            <strong className={styles.listItem_status}>
                                Ready to placed
                            </strong>
                            <span className={styles.listItem_data}>
                                20.04.24 15:21
                            </span>
                        </div>
                    </div>
                </CellListItem>
                <CellListItem topBottomPadding={10} className={styles.listItem}>
                    <button
                        onClick={() =>
                            handleOpenOrderHistoryModal({
                                status: "Executed",
                                title: "First order",
                                data: "20.04.24 15:21",
                            })
                        }
                    ></button>
                    <ExecutedIcon />
                    <div className={styles.listItem_wrapper}>
                        <div className={styles.listItem_block}>
                            <strong className={styles.listItem_title}>
                                First order
                            </strong>
                            <span className={styles.listItem_sub}>
                                + 0,1 BTC
                            </span>
                        </div>
                        <div className={styles.listItem_block}>
                            <strong
                                className={clsx(
                                    styles.listItem_status,
                                    "confirm_color"
                                )}
                            >
                                Executed
                            </strong>
                            <span className={styles.listItem_data}>
                                20.04.24 15:21
                            </span>
                        </div>
                    </div>
                </CellListItem>
                <CellListItem topBottomPadding={10} className={styles.listItem}>
                    <button
                        onClick={() =>
                            handleOpenOrderHistoryModal({
                                status: "Ready to placed",
                                title: "Insurance",
                                data: "20.04.24 15:21",
                            })
                        }
                    ></button>
                    <WaitIcon />
                    <div className={styles.listItem_wrapper}>
                        <div className={styles.listItem_block}>
                            <strong className={styles.listItem_title}>
                                Insurance
                            </strong>
                            <span className={styles.listItem_sub}>
                                + 0,01 BTC
                            </span>
                        </div>
                        <div className={styles.listItem_block}>
                            <strong className={styles.listItem_status}>
                                Ready to placed
                            </strong>
                            <span className={styles.listItem_data}>
                                20.04.24 15:21
                            </span>
                        </div>
                    </div>
                </CellListItem>
                <CellListItem topBottomPadding={10} className={styles.listItem}>
                    <button
                        onClick={() =>
                            handleOpenOrderHistoryModal({
                                status: "Canceled",
                                title: "Take profit",
                                data: "20.04.24 15:21",
                            })
                        }
                    ></button>
                    <CanceledIcon />
                    <div className={styles.listItem_wrapper}>
                        <div className={styles.listItem_block}>
                            <strong className={styles.listItem_title}>
                                Take profit
                            </strong>
                            <span className={styles.listItem_sub}>
                                - 0,01 BTC
                            </span>
                        </div>
                        <div className={styles.listItem_block}>
                            <strong
                                className={clsx(
                                    styles.listItem_status,
                                    "destructive_color"
                                )}
                            >
                                Canceled
                            </strong>
                            <span className={styles.listItem_data}>
                                20.04.24 15:21
                            </span>
                        </div>
                    </div>
                </CellListItem>
                <CellListItem topBottomPadding={10} className={styles.listItem}>
                    <button
                        onClick={() =>
                            handleOpenOrderHistoryModal({
                                status: "Ready to cancel",
                                title: "Insurance",
                                data: "20.04.24 15:21",
                            })
                        }
                    ></button>
                    <WaitIcon />
                    <div className={styles.listItem_wrapper}>
                        <div className={styles.listItem_block}>
                            <strong className={styles.listItem_title}>
                                Insurance
                            </strong>
                            <span className={styles.listItem_sub}>
                                + 0,01 BTC
                            </span>
                        </div>
                        <div className={styles.listItem_block}>
                            <strong className={styles.listItem_status}>
                                Ready to cancel
                            </strong>
                            <span className={styles.listItem_data}>
                                20.04.24 15:21
                            </span>
                        </div>
                    </div>
                </CellListItem>
                <CellListItem topBottomPadding={10} className={styles.listItem}>
                    <button
                        onClick={() =>
                            handleOpenOrderHistoryModal({
                                status: "Executed",
                                title: "First order",
                                data: "20.04.24 15:21",
                            })
                        }
                    ></button>
                    <ExecutedIcon />
                    <div className={styles.listItem_wrapper}>
                        <div className={styles.listItem_block}>
                            <strong className={styles.listItem_title}>
                                First order
                            </strong>
                            <span className={styles.listItem_sub}>
                                + 0,1 BTC
                            </span>
                        </div>
                        <div className={styles.listItem_block}>
                            <strong
                                className={clsx(
                                    styles.listItem_status,
                                    "confirm_color"
                                )}
                            >
                                Executed
                            </strong>
                            <span className={styles.listItem_data}>
                                20.04.24 15:21
                            </span>
                        </div>
                    </div>
                </CellListItem>
            </Cell>
            {orderHistoryActive && (
                <OrderHistoryModal
                    handleClose={handleHistoryModalClose}
                    {...orderHistoryActive}
                />
            )}
        </>
    );
};
