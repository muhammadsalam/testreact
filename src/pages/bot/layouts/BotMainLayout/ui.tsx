import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { FC, useState } from "react";
import { Cell, CellListItem } from "shared/ui";
import clsx from "clsx";
import { BotData } from "pages/bot";

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

type BotMainLayoutProps = {
    botData: BotData | null;
};

export const BotMainLayout: FC<BotMainLayoutProps> = ({ botData }) => {
    const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
    const handleTabChange = (tabId: "I_ORDER" | "TAKE_PROFIT") => {
        setActiveTab(tabId);
    };

    const getDate = (
        datetime: number | null,
        key: "price_socket_time" | "user_socket_time"
    ): string => {
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
        return "";
    };

    return (
        <>
            <div className={styles.top}>
                <p className={styles.top_title}>{botData?.pair}</p>
                <p className={styles.top_subtitle}>{botData?.title}</p>
                <Link className={styles.top_link} to="details">
                    Bot details
                </Link>
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
        </>
    );
};
