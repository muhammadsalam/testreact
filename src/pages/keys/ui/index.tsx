import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import PlusIcon from "assets/icons/plus.svg?react";
import { Cell, CellListItem } from "shared/ui";
import BinanceIcon from "assets/icons/binance.svg?react";
import { useSelector } from "react-redux";
import { RootState } from "app/AppStore";
import clsx from "clsx";

export const KeysPage = () => {
    const exchange_type = useSelector(
        (state: RootState) => state.user.data.exchange_type
    );

    if (exchange_type === null) {
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
                <CellListItem topBottomPadding={10}>
                    <div className={styles.button}>
                        <BinanceIcon />
                        <div className={styles.button_info}>
                            <b className={styles.button_title}>Binance</b>
                            <p className={styles.button_ph}>
                                API key: 0x8d5...e2dE
                            </p>
                        </div>
                    </div>
                </CellListItem>
                <CellListItem topBottomPadding={10}>
                    <div className={styles.button}>
                        <BinanceIcon />
                        <div className={styles.button_info}>
                            <b className={styles.button_title}>
                                Binance Testnet
                            </b>
                            <p className={styles.button_ph}>
                                API key: 0x8d5...e2dE
                            </p>
                        </div>
                    </div>
                </CellListItem>
                <CellListItem topBottomPadding={10}>
                    <div className={styles.button}>
                        <BinanceIcon />
                        <div className={styles.button_info}>
                            <b className={styles.button_title}>Binance</b>
                            <p className={styles.button_ph}>
                                API key: 0x8d5...e2dE
                            </p>
                        </div>
                    </div>
                </CellListItem>
            </Cell>
        </div>
    );
};
