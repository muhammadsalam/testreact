import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { FC, useState } from "react";
import { Cell, CellListItem, EmptyStateCard } from "shared/ui";
import clsx from "clsx";
import { BotData } from "pages/bot";
import EditIcon from "icons/edit.svg?react";
import StopIcon from "icons/stop.svg?react";
import { BotContent } from "widgets/bot-list-card/ui/bot-content";
import BtcusdtIcon from "icons/btcusdt.svg?react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { OpenOrderCard } from "widgets/open-order-card";
import { OrderHistory } from "widgets/order-history";

const tabs = [
    {
        id: "OPEN_ORDERS",
        title: "Open orders",
        disabled: false,
    },
    {
        id: "ORDER_HISTORY",
        title: "Order history",
        disabled: false,
    },
];

type BotMainLayoutProps = {
    botData: BotData | null;
};

export const BotMainLayout: FC<BotMainLayoutProps> = ({ botData }) => {
    const [activeTab, setActiveTab] = useState<string>(tabs[0].id);
    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
    };

    // const getDate = (
    //     datetime: number | null,
    //     key: "price_socket_time" | "user_socket_time"
    // ): string => {
    //     if (botData) {
    //         if (botData[key] && datetime) {
    //             const date = new Date(datetime * 1000);
    //             const tdate = {
    //                 day: date.getDate(),
    //                 month: date.toLocaleString("en", { month: "long" }),
    //                 hours: date.getHours(),
    //                 minutes: date.getMinutes(),
    //             };

    //             // Add leading zeros to minutes and hours if they are single digits
    //             const formattedMinutes = tdate.minutes
    //                 .toString()
    //                 .padStart(2, "0");
    //             const formattedHours = tdate.hours.toString().padStart(2, "0");

    //             return `${tdate.day} ${tdate.month} at ${formattedHours}:${formattedMinutes}`;
    //         } else return "" + botData[key];
    //     }
    //     return "";
    // };

    return (
        <>
            <div className={styles.top}>
                <BtcusdtIcon className={styles.top_icon} />
                <p className={styles.top_title}>{botData?.pair}</p>
                <p className={styles.top_subtitle}>{botData?.title}</p>
            </div>

            <div className={styles.buttons}>
                <button className={styles.actionBtn}>
                    <EditIcon /> Edit
                </button>
                <button className={styles.actionBtn}>
                    <StopIcon /> Stop
                </button>
            </div>

            <Cell>
                <BotContent />
            </Cell>

            <Cell title="bot information">
                <CellListItem>
                    Status bot
                    <span className={styles.black_color}>Active</span>
                </CellListItem>
                <CellListItem>
                    Created
                    <span className={styles.black_color}>
                        11 February at 12:44 pm
                    </span>
                </CellListItem>
                <CellListItem>
                    Works
                    <span className={styles.black_color}>5 d 12 h 14 m</span>
                </CellListItem>
                <CellListItem topBottomPadding={11}>
                    <Link className={styles.link} to="details">
                        Bot details
                    </Link>
                </CellListItem>
            </Cell>

            <Swiper
                initialSlide={10} // тут указать (длина массива - 1)
                modules={[Pagination]}
                spaceBetween={8}
                className={styles.slider}
                pagination={new Array(2).fill(0).length > 1 ? true : false}
            >
                {new Array(2).fill(0).map((_, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <Cell title={`Cycle ${index + 1}`}>
                                <CellListItem>
                                    Status cycle
                                    <span className={styles.black_color}>
                                        In progress
                                    </span>
                                </CellListItem>
                                <CellListItem>
                                    Entry price
                                    <span className={styles.black_color}>
                                        60 000 $
                                    </span>
                                </CellListItem>
                                <CellListItem>
                                    Take profit
                                    <span className={styles.black_color}>
                                        10 orders
                                    </span>
                                </CellListItem>
                                <CellListItem>
                                    Stop Loss
                                    <span className={styles.black_color}>
                                        40 000 $
                                    </span>
                                </CellListItem>
                                <CellListItem>
                                    Realized PnL
                                    <span className={styles.black_color}>
                                        +100 $
                                    </span>
                                </CellListItem>
                            </Cell>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            <div className={styles.tabs}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={clsx(
                            styles.tabs_button,
                            activeTab === tab.id && styles.tabs_button__active
                        )}
                        onClick={() => handleTabChange(tab.id)}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>

            {activeTab === "OPEN_ORDERS" ? (
                new Array(1).length > 0 ? (
                    <OpenOrderCard />
                ) : (
                    <EmptyStateCard
                        title="You don't have any open orders"
                        body="All your open orders will be displayed here"
                    />
                )
            ) : new Array(2).length > 0 ? (
                <OrderHistory />
            ) : (
                <EmptyStateCard
                    title="You don't have an order history"
                    body="All your order history will be displayed here"
                />
            )}

            {/* {botData &&
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
                    })} */}
        </>
    );
};
