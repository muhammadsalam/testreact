import { Cell } from "shared/ui";
import BinanceIcon from "assets/icons/binance.svg?react";
import styles from "./styles.module.scss";
import { FC, memo, useEffect, useState } from "react";
import CheckmarkIcon from "assets/icons/checkmark.svg?react";
import { tgApp } from "shared/lib";

interface ExchangeSelectLayoutProps {
    setActiveExchange: React.Dispatch<React.SetStateAction<string>>;
    activeExchange: string;
}

const exchangeList = [
    {
        title: "Binance",
        id: "BINANCE",
    },
    {
        title: "Binance Testnet",
        id: "BINANCE_TESTNET",
    },
];

export const ExchangeSelectLayout: FC<ExchangeSelectLayoutProps> = memo(
    ({ setActiveExchange, activeExchange }) => {
        const [localActiveExchange, setLocalActiveExchange] =
            useState(activeExchange);

        useEffect(() => {
            tgApp.BackButton.show();

            const backButtonHandler = () => {
                tgApp.BackButton.hide();
                history.back();
            };
            tgApp.BackButton.onClick(backButtonHandler);

            tgApp.MainButton.text = "Done";
            tgApp.MainButton.color = "#007AFF";

            return () => {
                tgApp.BackButton.offClick(backButtonHandler);
            };
        }, []);

        useEffect(() => {
            const mainButtonHandler = () => {
                setActiveExchange(localActiveExchange);
                history.back();
            };

            tgApp.MainButton.onClick(mainButtonHandler);

            return () => {
                tgApp.MainButton.offClick(mainButtonHandler);
            };
        }, [localActiveExchange]);

        return (
            <Cell title="exchanges">
                {exchangeList.map((exchange) => (
                    <button
                        key={exchange.id}
                        className={styles.navButton}
                        onClick={() => setLocalActiveExchange(exchange.id)}
                    >
                        <BinanceIcon />
                        <div className={styles.content}>
                            <div className={styles.content_info}>
                                <div className={styles.content_info_title}>
                                    {exchange.title}
                                </div>
                            </div>
                            {localActiveExchange === exchange.id && (
                                <CheckmarkIcon />
                            )}
                        </div>
                    </button>
                ))}
            </Cell>
        );
    }
);
