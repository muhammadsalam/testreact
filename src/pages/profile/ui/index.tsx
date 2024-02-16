import { FC, useEffect } from "react";
import styles from "./style.module.scss";
import { Cell, CellListItem } from "shared/ui";
import ArrowRightIcon from "../../../assets/icons/arrow.svg?react";
import KeysIcon from "../../../assets/icons/keys.svg?react";
import BtcusdtIcon from "../../../assets/icons/btcusdt.svg?react";
import { Link } from "react-router-dom";
import { tgApp } from "shared/lib";
import { useSelector } from "react-redux";
import clsx from "clsx";

export const ProfilePage: FC = () => {
    useEffect(() => {
        tgApp.MainButton.hide();
        tgApp.BackButton.hide();
    }, []);

    const userData = useSelector((state: any) => state.user.data);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <p className={styles.top_title}>Deposit</p>
                <strong className={styles.top_strong}>
                    {userData.used_balance} <span>$</span>
                </strong>
                {+userData.profit !== 0 && (
                    <span
                        className={clsx(styles.top_sub, {
                            [styles.top_sub__red]: userData.profit < 0,
                        })}
                    >
                        {userData.profit > 0 && "+"}
                        {userData.profit} $
                    </span>
                )}
            </div>

            <Link to="createbot/step1" style={{ display: "contents" }}>
                <button className={styles.btn__primary}>Creat new bot</button>
            </Link>

            <Link to="/keys" className={clsx(styles.keys_btn)}>
                <Cell>
                    <CellListItem
                        className={styles.navButton}
                        topBottomPadding={0}
                        leftRightPadding={0}
                    >
                        <div className={styles.content}>
                            <KeysIcon />
                            API Keys
                        </div>
                        <div className={styles.right}>
                            1
                            <ArrowRightIcon />
                        </div>
                    </CellListItem>
                </Cell>
            </Link>

            {userData.bots?.length > 0 ? (
                <Cell title="list of bots">
                    {userData.bots.map((item: any, index: number) => (
                        <Link
                            to={"/bot/" + item.id}
                            className={styles.navButton}
                            key={index}
                        >
                            <div className={styles.content}>
                                <BtcusdtIcon />
                                <div className={styles.content_info}>
                                    <div className={styles.content_info_title}>
                                        {item.pair}
                                    </div>
                                    <div className={styles.info_titleBlock}>
                                        {item.title}
                                    </div>
                                    {/* <div className={styles.content_info_block}>
                                        TP: 05{" "}
                                        <span className={styles.circle}></span>
                                        TP: 05{" "}
                                        <span className={styles.circle}></span>
                                        <span className={styles.green}>
                                            DEP: 70 ₮ 􀄯
                                        </span>
                                    </div> */}
                                </div>
                            </div>
                            <ArrowRightIcon className={styles.navButton_icon} />
                        </Link>
                    ))}
                    {/* <button className={styles.navButton}>
                        <div className={styles.content}>
                            <BtcusdtIcon />
                            <div className={styles.content_info}>
                                <div className={styles.content_info_title}>
                                    BTC<span>USDT</span>
                                </div>
                                <div className={styles.content_info_block}>
                                    TP: 05{" "}
                                    <span className={styles.circle}></span>
                                    TP: 05{" "}
                                    <span className={styles.circle}></span>
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
                                    TP: 05{" "}
                                    <span className={styles.circle}></span>
                                    TP: 05{" "}
                                    <span className={styles.circle}></span>
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
                                    TP: 08{" "}
                                    <span className={styles.circle}></span>
                                    TP: 05{" "}
                                    <span className={styles.circle}></span>
                                    <span className={styles.red}>
                                        DEP: 432 ₮ 􀄱
                                    </span>
                                </div>
                            </div>
                        </div>
                        <ArrowRightIcon className={styles.navButton_icon} />
                    </button> */}
                </Cell>
            ) : (
                <Cell>
                    <div className={styles.emptyBots_wrapper}>
                        <strong className={styles.emptyBots_title}>
                            You don't have bots yet
                        </strong>
                        <p className={styles.emptyBots_paragraph}>
                            All your bots will be displayed here
                        </p>
                    </div>
                </Cell>
            )}
        </div>
    );
};
