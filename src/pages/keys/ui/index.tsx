import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import PlusIcon from "assets/icons/plus.svg?react";
import { Cell } from "shared/ui";
import BinanceIcon from "assets/icons/binance.svg?react";
import { useSelector } from "react-redux";
import { RootState } from "app/AppStore";
import clsx from "clsx";
import { useEffect } from "react";
import { tgApp } from "shared/lib";

export const KeysPage = () => {
    useEffect(() => {
        tgApp.BackButton.show();
        tgApp.MainButton.hide();

        const backButtonHandler = () => {
            window.history.back();
        };

        tgApp.BackButton.onClick(backButtonHandler);

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
        };
    }, []);

    const wallets = useSelector(
        (state: RootState) => state.user.data.wallets.data
    );

    if (wallets.length === 0) {
        return (
            <div className={clsx(styles.container, styles.exContainer)}>
                <strong className={styles.exContainer_title}>
                    API Key are not yet available
                </strong>
                <p className={styles.exContainer_ph}>
                    At least one api key must be added to create a bot
                </p>
                <Link to="/keyadd" className={styles.exContainer_btn}>
                    Add API Key
                </Link>
            </div>
        );
    }
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <p className={styles.top_title}>API Keys</p>
            </div>

            <Link to="/keyadd" className={styles.addKeyButton}>
                <PlusIcon />
                Add API Key
            </Link>

            <Cell className={styles.list}>
                {wallets.map((wallet) => {
                    return (
                        <button className={styles.button}>
                            <BinanceIcon />
                            <div className={styles.button_info}>
                                <b className={styles.button_title}>
                                    {wallet.exchange}
                                </b>
                                <p className={styles.button_ph}>
                                    API key: {wallet.api_key}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </Cell>
        </div>
    );
};
