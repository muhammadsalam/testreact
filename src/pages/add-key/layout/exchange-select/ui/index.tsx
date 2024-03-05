import { Cell } from "shared/ui";
import BinanceIcon from "assets/icons/binance.svg?react";
import styles from "./styles.module.scss";
import { FC, memo, useEffect, useState } from "react";
import CheckmarkIcon from "assets/icons/checkmark.svg?react";
import { tgApp } from "shared/lib";
import { useSelector } from "react-redux";
import { RootState } from "app/AppStore";
import { ExchangeType } from "entities/exchanges";

interface ExchangeSelectLayoutProps {
    setActiveExchange: React.Dispatch<React.SetStateAction<ExchangeType>>;
    activeExchange: ExchangeType;
}

export const ExchangeSelectLayout: FC<ExchangeSelectLayoutProps> = memo(
    ({ setActiveExchange, activeExchange }) => {
        const exchanges = useSelector((state: RootState) => state.exchanges);
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
                {exchanges.map((exchange) => (
                    <button
                        key={exchange?.id}
                        className={styles.navButton}
                        onClick={() => setLocalActiveExchange(exchange)}
                    >
                        <BinanceIcon />
                        <div className={styles.content}>
                            <div className={styles.content_info}>
                                <div className={styles.content_info_title}>
                                    {exchange?.title}
                                </div>
                            </div>
                            {localActiveExchange?.id === exchange?.id && (
                                <CheckmarkIcon />
                            )}
                        </div>
                    </button>
                ))}
            </Cell>
        );
    }
);
