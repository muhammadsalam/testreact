import { Cell } from "shared/ui";
import styles from "./style.module.scss";
import { handleInputFocus, handleInputScroll, tgApp } from "shared/lib";
import { ChangeEvent, useEffect, useState } from "react";
import { useBot } from "pages/create-bot/libs";
import CheckmarkIcon from "../../../../../assets/icons/checkmark.svg?react";
import BtcusdtIcon from "../../../../../assets/icons/btcusdt.svg?react";

interface Pair {
    id: string;
    symbol: string;
    base: string;
    quote: string;
    limits: {
        amount: {
            min: number;
            max: number;
        };
        cost: {
            min: number;
            max: number;
        };
    };
}

export const PairListLayout = () => {
    const {
        bot: { pair },
        setBot,
    } = useBot();

    const [pairList] = useState<Pair[]>([
        {
            id: "BTCUSDT",
            symbol: "BTC/USDT",
            base: "BTC",
            quote: "USDT",
            limits: {
                amount: {
                    min: 1e-5,
                    max: 9000.0,
                },
                cost: {
                    min: 5.0,
                    max: 9000000.0,
                },
            },
        },
        {
            id: "ETHUSDT",
            symbol: "ETH/USDT",
            base: "ETH",
            quote: "USDT",
            limits: {
                amount: {
                    min: 0.0001,
                    max: 9000.0,
                },
                cost: {
                    min: 5.0,
                    max: 9000000.0,
                },
            },
        },
        {
            id: "BNBUSDT",
            symbol: "BNB/USDT",
            base: "BNB",
            quote: "USDT",
            limits: {
                amount: {
                    min: 0.001,
                    max: 900000.0,
                },
                cost: {
                    min: 5.0,
                    max: 9000000.0,
                },
            },
        },
        {
            id: "BCCUSDT",
            symbol: "BCC/USDT",
            base: "BCC",
            quote: "USDT",
            limits: {
                amount: {
                    min: 1e-5,
                    max: 90000.0,
                },
                cost: {
                    min: 10.0,
                    max: 9000000.0,
                },
            },
        },
        {
            id: "NEOUSDT",
            symbol: "NEO/USDT",
            base: "NEO",
            quote: "USDT",
            limits: {
                amount: {
                    min: 0.01,
                    max: 90000.0,
                },
                cost: {
                    min: 5.0,
                    max: 9000000.0,
                },
            },
        },
    ]);

    const [activePair, setActivePair] = useState(pair);
    const [newPairList, setNewPairList] = useState<Pair[]>(pairList);

    const [searchValue, setSearchValue] = useState<string>("");
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        console.log("debounce");
        handleNewPairListRender(e.target.value);
        console.log("debounce done");
    };

    const handleNewPairListRender = (value: string) => {
        setNewPairList(
            pairList.filter((item) => item.id.match(value.toUpperCase()))
        );
    };

    const handlePairClick = (item: Pair) => {
        setActivePair(item);
    };

    useEffect(() => {
        const backButtonHandler = () => {
            window.history.back();
        };
        tgApp.BackButton.onClick(backButtonHandler);

        const mainButtonHandler = () => {
            setBot((prevBot) => ({
                ...prevBot,
                pair: activePair,
            }));
            window.location.hash = "#1";
        };
        tgApp.MainButton.onClick(mainButtonHandler);
        tgApp.MainButton.text = "Done";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, [pair, activePair]);

    const ListPairRender = () => {
        return newPairList.map((pairItem) => (
            <button
                key={pairItem.id}
                className={styles.navButton}
                onClick={() => handlePairClick(pairItem)}
            >
                <BtcusdtIcon />
                <div className={styles.content}>
                    <div className={styles.content_info}>
                        <div className={styles.content_info_title}>
                            {pairItem.base}
                            <span>{pairItem.quote}</span>
                        </div>
                    </div>
                    {activePair.id === pairItem.id && <CheckmarkIcon />}
                </div>
            </button>
        ));
    };

    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder="Pair search"
                className={styles.input}
                value={searchValue}
                onClick={handleInputScroll}
                onFocus={handleInputFocus}
                onChange={handleInputChange}
            />
            <Cell title="list of pairs">
                <ListPairRender />
            </Cell>
        </div>
    );
};
