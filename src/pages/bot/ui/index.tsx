import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Cell, CellListItem } from "shared/ui";
import { tgApp } from "shared/lib";

interface BotData {
    // purchase_price: 0;
    // io_step: 5;
    // take_step: 1;
    // user_id: 21;
    // ammount_first_order: 100;
    // io_mrt: 1;
    // wallet_id: 9;
    // type_first_order: "LIMIT";
    // io_step_mrt: 1;
    // take_mrt: 1;
    // price_first_order: 40000;
    // stop_loss: 0;
    // cycles: 1;
    // pair: "BTCUSDT";
    // active_def: true;
    // active_tp: true;
    // status: "STARTED";
    // strategy: "LONG";
    // def_type: "IO";
    // take_type: "AUTO";
    // id: 152;
    // active_buy: true;
    // io_calculate_type: "LO";
    // take_profit: 10;
    // existing_volume: 0;
    // io_count: 3;
    // take_ammount: 50;
    price_socket_time: null | number;
    user_socket_time: null | number;
    title: string;
    orders: {
        pair: string;
        amount_input: number;
        status: string;
        order_type: string;
        id: number;
        price: number;
        bot_id: number;
        amount_output: number;
        type: string;
        cycle: number;
    }[];
}

export const BotPage = () => {
    const { id: botID } = useParams();
    const token = useSelector((state: any) => state.user.token);

    const [botData, setBotData] = useState<BotData | null>(null);

    useEffect(() => {
        axios
            .get(
                `https://back.anestheziabot.tra.infope9l.beget.tech/v1/bot_data?bot_id=${botID}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                return res.data.status === "success" && res.data.data;
            })
            .then((data) => {
                setBotData(data);
                console.log(data);
            })
            .catch((error) => {
                console.log("something went wrong", error);
            });
    }, []);

    useEffect(() => {
        tgApp.BackButton.show();

        const backButtonHandler = () => {
            tgApp.BackButton.hide();
            window.history.back();
        };
        tgApp.BackButton.onClick(backButtonHandler);

        const mainButtonHandler = () => {
            tgApp.BackButton.hide();
            window.history.back();
        };

        tgApp.MainButton.onClick(mainButtonHandler);

        tgApp.MainButton.show();
        tgApp.MainButton.text = "go to main";
        tgApp.MainButton.color = "#007AFF";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, []);

    const getDate = (
        datetime: number | null,
        key: "price_socket_time" | "user_socket_time"
    ) => {
        if (botData) {
            if (botData[key] && datetime) {
                const date = new Date(datetime * 1000);
                return `${date.getDate()}.${date.getMonth() + 1}.${(
                    date.getFullYear() + ""
                ).slice(
                    2
                )} (${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()})`;
            } else return "" + botData[key];
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <p className={styles.top_title}>Bot title - {botData?.title}</p>
                <p className={styles.top_subtitle}>
                    Some subtitle under title here
                </p>
            </div>

            <Cell>
                <CellListItem>
                    price_socket_time
                    <span className={styles.black_color}>
                        {getDate(
                            botData && botData?.price_socket_time,
                            "price_socket_time"
                        )}
                    </span>
                </CellListItem>
                <CellListItem>
                    user_socket_time
                    <span className={styles.black_color}>
                        {getDate(
                            botData && botData?.user_socket_time,
                            "user_socket_time"
                        )}
                    </span>
                </CellListItem>
            </Cell>

            {botData &&
                botData.orders.map((order, index) => {
                    return (
                        <Cell key={index} title={`order ${index + 1}`}>
                            <CellListItem>
                                id
                                <span className={styles.black_color}>
                                    {order.id}
                                </span>
                            </CellListItem>
                            <CellListItem>
                                bot_id
                                <span className={styles.black_color}>
                                    {order.bot_id}
                                </span>
                            </CellListItem>
                            <CellListItem>
                                amount_input
                                <span className={styles.black_color}>
                                    {order.amount_input}
                                </span>
                            </CellListItem>
                            <CellListItem>
                                amount_output
                                <span className={styles.black_color}>
                                    {order.amount_output}
                                </span>
                            </CellListItem>
                            <CellListItem>
                                cycle
                                <span className={styles.black_color}>
                                    {order.cycle}
                                </span>
                            </CellListItem>
                            <CellListItem>
                                order_type
                                <span className={styles.black_color}>
                                    {order.order_type}
                                </span>
                            </CellListItem>
                            <CellListItem>
                                pair
                                <span className={styles.black_color}>
                                    {order.pair}
                                </span>
                            </CellListItem>
                            <CellListItem>
                                price
                                <span className={styles.black_color}>
                                    {order.price}
                                </span>
                            </CellListItem>
                            <CellListItem>
                                status
                                <span className={styles.black_color}>
                                    {order.status}
                                </span>
                            </CellListItem>
                            <CellListItem>
                                type
                                <span className={styles.black_color}>
                                    {order.type}
                                </span>
                            </CellListItem>
                        </Cell>
                    );
                })}

            {/* <Cell title="orders">
                {botData &&
                    botData.orders.map((order) => {
                        return (
                            <CellListItem key={order.id}>
                                <p>{order.price}</p>
                                <p>{order.status}</p>
                            </CellListItem>
                        );
                    })}
            </Cell> */}
        </div>
    );
};
