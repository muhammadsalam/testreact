import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import { FC } from "react";
import BtcusdtIcon from "icons/btcusdt.svg?react";
import { BotContent } from "./bot-content";

type Props = {
    item: {
        id: number;
        title: string;
        pair: string;
    };
};

export const BotListCard: FC<Props> = ({ item }) => {
    return (
        <Link to={"/bot/" + item.id} className={styles.wrapper}>
            <div className={styles.top}>
                <div className={styles.top_info_wrapper}>
                    <BtcusdtIcon />
                    <div className={styles.top_info}>
                        <div className={styles.top_info_title}>{item.pair}</div>
                        <div className={styles.top_info_sub}>{item.title}</div>
                    </div>
                </div>
                <div className={styles.top_status}>
                    <div className={styles.top_status_title}>Active</div>
                    <div className={styles.top_status_sub}>
                        Created 01.05.2024
                    </div>
                </div>
            </div>

            <BotContent />
        </Link>
    );
};
