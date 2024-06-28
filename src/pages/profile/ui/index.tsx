import { FC, MouseEvent, useEffect } from "react";
import styles from "./style.module.scss";
import { Cell } from "shared/ui";
import ArrowRightIcon from "../../../assets/icons/arrow.svg?react";
import KeysIcon from "../../../assets/icons/keys.svg?react";
import { Link } from "react-router-dom";
import { blockVerticalScrollApp, tgApp } from "shared/lib";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { RootState } from "app/AppStore";
import { addAlert } from "entities/notification";
import { Dispatch } from "@reduxjs/toolkit";
import { resetBot } from "pages/create-bot";
import { BotListCard } from "widgets/bot-list-card";

export const ProfilePage: FC = () => {
    const userData = useSelector((state: RootState) => state.user.data);

    useEffect(() => {
        tgApp.MainButton.hide();
        tgApp.BackButton.hide();

        blockVerticalScrollApp(true);
    }, []);

    const dispatch: Dispatch<any> = useDispatch();

    const handleCreateBot = (e: MouseEvent) => {
        if (userData.wallets.count === 0) {
            dispatch(
                addAlert({
                    title: "Before you can create a bot, you need to add API Key",
                })
            );
            e.preventDefault();
        }
        dispatch(resetBot());
    };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <p className={styles.top_title}>Deposit</p>
                <strong className={styles.top_strong}>
                    {(userData.used_balance.toString().match(/\d{4,}\./) // если 4 и больше цифр до точки, то 2 знака после
                        ? userData.used_balance
                              .toString()
                              .match(/\d+\.?\d{0,2}/)
                        : userData.used_balance // иначе 5 знаков после
                              .toString()
                              .match(/\d+\.?\d{0,5}/)) || "0.00"}
                    <span>$</span>
                </strong>
                {/* {+userData.profit !== 0 && (
                    <span
                        className={clsx(styles.top_sub, {
                            [styles.top_sub__red]: userData.profit < 0,
                        })}
                    >
                        {userData.profit > 0 && "+"}
                        {userData.profit} $
                    </span>
                )} */}
            </div>

            <Link
                to="createbot/step1"
                style={{ display: "contents" }}
                onClick={handleCreateBot}
            >
                <button className={styles.btn__primary}>Create new bot</button>
            </Link>

            <Cell>
                <Link
                    to="/keys"
                    className={clsx(styles.navButton, styles.navButton__keys)}
                >
                    <KeysIcon />
                    <div className={styles.content}>
                        API Keys
                        <div className={styles.right}>
                            {userData.wallets.count}
                            <ArrowRightIcon />
                        </div>
                    </div>
                </Link>
            </Cell>

            {userData.bots?.length > 0 ? (
                <Cell listClass={false} title="list of bots">
                    {userData.bots.map((item: any, index: number) => (
                        <BotListCard key={index} item={item} />
                    ))}
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
