import { FC } from "react";
import styles from "./style.module.scss";
import { Cell, Switcher } from "shared/ui";
import ArrowRightIcon from "../../../assets/icons/arrow.svg?react";
import BtcusdtIcon from "../../../assets/icons/btcusdt.svg?react";
import ChartIcon from "../../../assets/icons/chart.svg?react";

export const ConfigurePage: FC = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.top}>
                    <p className={styles.top_title}>Basic settings</p>
                    <p className={styles.top_subtitle}>
                        Configure the buy settings for your anesthezia
                    </p>
                </div>

                <Cell title="bot name">
                    <div className={styles.block}>Bot 1</div>
                </Cell>

                <Cell title="pair" description="1 BTC = 26 280.25 ₮">
                    <button className={styles.navButton}>
                        <div className={styles.content}>
                            <BtcusdtIcon />
                            <div className={styles.content_info}>
                                <div className={styles.content_info_title}>
                                    BTC<span>USDT</span>
                                </div>
                            </div>
                        </div>
                        <ArrowRightIcon className={styles.navButton_icon} />
                    </button>
                </Cell>

                <Cell title="trade">
                    <div className={styles.block}>
                        <ChartIcon />
                        Long
                    </div>
                </Cell>

                <Cell title="additionally">
                    <div className={styles.list_item}>
                        Strategy
                        <Switcher />
                    </div>
                    <div className={styles.list_item}>
                        Defends
                        <Switcher />
                    </div>
                    <div className={styles.list_item}>
                        Take Profit
                        <Switcher />
                    </div>
                </Cell>
            </div>
            <div className={styles.bottom}>
                <button className={styles.btn__primary}>
                    Next to step 2 / 6
                </button>
            </div>
        </>
    );
};
