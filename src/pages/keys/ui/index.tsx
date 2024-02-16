import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import PlusIcon from "assets/icons/plus.svg?react";
import { Cell, CellListItem } from "shared/ui";
import BinanceIcon from "assets/icons/binance.svg?react";

export const KeysPage = () => {
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
