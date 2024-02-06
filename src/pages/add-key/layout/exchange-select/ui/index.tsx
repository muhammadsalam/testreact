import { Cell } from "shared/ui";
import BinanceIcon from "assets/icons/binance.svg?react";
import styles from "./styles.module.scss";
import { FC, useEffect } from "react";
import CheckmarkIcon from "assets/icons/checkmark.svg?react";

export const ExchangeSelectLayout: FC<{
    handleExchangeChange: (title: string) => void;
    activeExchange: string;
}> = ({ handleExchangeChange, activeExchange }) => {
    const exchangeList = [
        {
            title: "Binance",
        },
        {
            title: "Binance Testnet",
        },
    ];

    useEffect(() => {
        // tgApp.setTitle;
    }, []);

    return (
        <Cell title="exchanges">
            {exchangeList.map((exchange) => (
                <button
                    key={exchange.title}
                    className={styles.navButton}
                    onClick={() => handleExchangeChange(exchange.title)}
                >
                    <BinanceIcon />
                    <div className={styles.content}>
                        <div className={styles.content_info}>
                            <div className={styles.content_info_title}>
                                {exchange.title}
                            </div>
                        </div>
                        {activeExchange === exchange.title && <CheckmarkIcon />}
                    </div>
                </button>
            ))}
        </Cell>
    );
};
