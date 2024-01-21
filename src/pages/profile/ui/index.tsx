import { FC, useEffect } from "react";
import styles from "./style.module.scss";
import { Cell } from "shared/ui";
import ArrowRightIcon from "../../../assets/icons/arrow.svg?react";
import BinanceIcon from "../../../assets/icons/binance.svg?react";
import BtcusdtIcon from "../../../assets/icons/btcusdt.svg?react";
import SolusdcIcon from "../../../assets/icons/solusdc.svg?react";
import TwtusdtIcon from "../../../assets/icons/twtusdt.svg?react";
import { Link } from "react-router-dom";
import { tgApp } from "shared/lib";

export const ProfilePage: FC = () => {
    useEffect(() => {
        tgApp.MainButton.hide();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <p className={styles.top_title}>Deposit</p>
                <strong className={styles.top_strong}>
                    15 194.35 <span>$</span>
                </strong>
                <span className={styles.top_sub}>+234.35</span>
            </div>

            <Link to="/createbot" style={{ display: "contents" }}>
                <button className={styles.btn__primary}>Creat new bot</button>
            </Link>

            <Cell title="KEY Settings">
                <button className={styles.navButton}>
                    <div className={styles.content}>
                        <BinanceIcon />
                        Binance
                    </div>
                    <ArrowRightIcon className={styles.navButton_icon} />
                </button>
            </Cell>

            <Cell title="list of bots">
                <button className={styles.navButton}>
                    <div className={styles.content}>
                        <BtcusdtIcon />
                        <div className={styles.content_info}>
                            <div className={styles.content_info_title}>
                                BTC<span>USDT</span>
                            </div>
                            <div className={styles.content_info_block}>
                                TP: 05 <span className={styles.circle}></span>
                                TP: 05 <span className={styles.circle}></span>
                                <span className={styles.green}>
                                    DEP: 70 ₮ 􀄯
                                </span>
                            </div>
                        </div>
                    </div>
                    <ArrowRightIcon className={styles.navButton_icon} />
                </button>

                <button className={styles.navButton}>
                    <div className={styles.content}>
                        <SolusdcIcon />
                        <div className={styles.content_info}>
                            <div className={styles.content_info_title}>
                                SOL<span>USDC</span>
                            </div>
                            <div className={styles.content_info_block}>
                                TP: 05 <span className={styles.circle}></span>
                                TP: 05 <span className={styles.circle}></span>
                                <span className={styles.green}>
                                    DEP: 234 ₮ 􀄯
                                </span>
                            </div>
                        </div>
                    </div>
                    <ArrowRightIcon className={styles.navButton_icon} />
                </button>

                <button className={styles.navButton}>
                    <div className={styles.content}>
                        <TwtusdtIcon />
                        <div className={styles.content_info}>
                            <div className={styles.content_info_title}>
                                TWT<span>USDT</span>
                            </div>
                            <div className={styles.content_info_block}>
                                TP: 08 <span className={styles.circle}></span>
                                TP: 05 <span className={styles.circle}></span>
                                <span className={styles.red}>DEP: 432 ₮ 􀄱</span>
                            </div>
                        </div>
                    </div>
                    <ArrowRightIcon className={styles.navButton_icon} />
                </button>
            </Cell>
        </div>
    );
};
