import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Cell, CellListItem } from "shared/ui";
import { tgApp } from "shared/lib";
import clsx from "clsx";

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
    pair: string;
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
                const tdate = {
                    day: date.getDate(),
                    month: date.toLocaleString("en", { month: "long" }),
                    hours: date.getHours(),
                    minutes: date.getMinutes(),
                    meridiem: date.getHours() > 12 ? "PM" : "AM",
                };

                return `${tdate.day} ${tdate.month} at ${tdate.hours}:${
                    tdate.minutes
                } ${tdate.meridiem.toLowerCase()}`;
            } else return "" + botData[key];
        }
    };

    const tabs = [
        {
            title: "Insurance",
            disabled: false,
            id: "I_ORDER",
        },
        {
            title: "Take Profit",
            disabled: false,
            id: "TAKE_PROFIT",
        },
    ];

    const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
    const handleTabChange = (tabId: "I_ORDER" | "TAKE_PROFIT") => {
        setActiveTab(tabId);
    };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <p className={styles.top_title}>{botData?.pair}</p>
                <p className={styles.top_subtitle}>{botData?.title}</p>
                <a className={styles.top_link}>Bot details</a>
            </div>

            <Cell title="socket activation time">
                <CellListItem>
                    Socket user
                    <span className={styles.black_color}>
                        {getDate(
                            botData && botData?.user_socket_time,
                            "user_socket_time"
                        )}
                    </span>
                </CellListItem>
                <CellListItem>
                    Socket pair
                    <span className={styles.black_color}>
                        {getDate(
                            botData && botData?.price_socket_time,
                            "price_socket_time"
                        )}
                    </span>
                </CellListItem>
            </Cell>

            <div className={styles.tabs}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={clsx(
                            styles.tabs_button,
                            activeTab === tab.id && styles.tabs_button__active
                        )}
                        onClick={() =>
                            handleTabChange(tab.id as "I_ORDER" | "TAKE_PROFIT")
                        } // Use handleTabChange instead of setActiveTab
                    >
                        {tab.title}
                    </button>
                ))}
            </div>

            {botData &&
                botData.orders
                    .filter((x) => {
                        if (activeTab === "I_ORDER")
                            return x.type !== "TAKE_PROFIT";
                        return x.type === "TAKE_PROFIT";
                    })
                    .map((order, index) => {
                        return (
                            <Cell key={index} title={order.type}>
                                <div className={styles.order_wrapper}>
                                    <div className={styles.order_item}>
                                        status
                                        <span
                                            className={clsx(
                                                styles.black_color,
                                                {
                                                    [styles.status__success]:
                                                        order.status ===
                                                        "CREATED",
                                                    [styles.status__warning]:
                                                        order.status ===
                                                        "READY_TO_PLACED",
                                                    [styles.status__error]:
                                                        order.status ===
                                                        "CANCELED",
                                                }
                                            )}
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
