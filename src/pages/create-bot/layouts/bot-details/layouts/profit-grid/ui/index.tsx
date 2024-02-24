import { Cell } from "shared/ui";
import styles from "./styles.module.scss";
import { FC, useEffect } from "react";
import { OrdersType } from "pages/create-bot/layouts";
import clsx from "clsx";
import { tgApp } from "shared/lib";

export const ProfitGridLayout: FC<{ botOrders: OrdersType }> = ({
    botOrders,
}) => {
    useEffect(() => {
        window.scrollTo(0, 0);

        tgApp.MainButton.hide();

        return () => {
            tgApp.MainButton.show();
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <p className={styles.top_title}>Take Profit Grid</p>
            </div>

            {botOrders
                .filter((x) => {
                    return x.type === "TAKE_PROFIT";
                })
                .map((order, index) => {
                    return (
                        <Cell key={index} title={order.type}>
                            <div className={styles.order_wrapper}>
                                <div className={styles.order_item}>
                                    status
                                    <span
                                        className={clsx(styles.black_color, {
                                            [styles.status__orange]:
                                                order.status ===
                                                "READY_TO_PLACED",
                                        })}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                                <div className={styles.order_item}>
                                    amount_input
                                    <span className={styles.black_color}>
                                        {order.amount_input}
                                    </span>
                                </div>
                                <div className={styles.order_item}>
                                    amount_output
                                    <span className={styles.black_color}>
                                        {order.amount_output}
                                    </span>
                                </div>
                                <div className={styles.order_item}>
                                    price
                                    <span className={styles.black_color}>
                                        {order.price}
                                    </span>
                                </div>
                                <div className={styles.order_item}>
                                    order_type
                                    <span className={styles.black_color}>
                                        {order.order_type}
                                    </span>
                                </div>
                                <div className={styles.order_item}>
                                    id
                                    <span className={styles.black_color}>
                                        {order.id}
                                    </span>
                                </div>
                                <div className={styles.order_item}>
                                    bot_id
                                    <span className={styles.black_color}>
                                        {order.bot_id}
                                    </span>
                                </div>

                                <div className={styles.order_item}>
                                    cycle
                                    <span className={styles.black_color}>
                                        {order.cycle}
                                    </span>
                                </div>
                            </div>
                        </Cell>
                    );
                })}
        </div>
    );
};
