import { useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Cell, CellListItem } from "shared/ui";
import { tgApp } from "shared/lib";

interface BotData {
    // price_socket_time: 1707476359.3164392;
    // user_socket_time: null;
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
    // title: "string";
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

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <p className={styles.top_title}>Bot name</p>
                <p className={styles.top_subtitle}>
                    Some subtitle under title here
                </p>
            </div>

            <Cell title="orders">
                {botData &&
                    botData.orders.map((order) => {
                        return (
                            <CellListItem key={order.id}>
                                <p>{order.price}</p>
                                <p>{order.status}</p>
                            </CellListItem>
                        );
                    })}
            </Cell>
        </div>
    );
};
