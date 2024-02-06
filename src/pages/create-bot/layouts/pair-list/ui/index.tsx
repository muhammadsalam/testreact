import { Cell, CurrencyIcon } from "shared/ui";
import styles from "./style.module.scss";
import { handleInputFocus, handleInputScroll, tgApp } from "shared/lib";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useBot } from "pages/create-bot/libs";
import CheckmarkIcon from "../../../../../assets/icons/checkmark.svg?react";
import axios from "axios";

interface Pair {
    id: string;
    symbol: string;
    base: string;
    quote: string;
    baseimg: string;
    quoteimg: string;
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

    const [activePair] = useState(pair);
    const [pairList, setPairList] = useState<Pair[]>([]);
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

    // const handlePairClick = (item: Pair) => {
    //     setActivePair(item);
    // };

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

    console.log(tgApp.initData);

    useEffect(() => {
        axios
            .get(
                "https://back.anestheziabot.tra.infope9l.beget.tech/v1/get_pair"
            )
            .then((res) => {
                setPairList(res.data);
                setNewPairList(res.data);
            });
    }, []);

    const ListPairRender = () => {
        return newPairList.map((pairItem) => (
            <PairItem pair={pairItem} />
            // <button
            //     key={pairItem.id}
            //     className={styles.navButton}
            //     onClick={() => handlePairClick(pairItem)}
            // >
            //     <CurrencyIcon
            //         baseimg={pairItem.baseimg}
            //         quoteimg={pairItem.quoteimg}
            //     />
            //     <div className={styles.content}>
            //         <div className={styles.content_info}>
            //             <div className={styles.content_info_title}>
            //                 {pairItem.base}
            //                 <span>{pairItem.quote}</span>
            //             </div>
            //         </div>
            //         {activePair.id === pairItem.id && <CheckmarkIcon />}
            //     </div>
            // </button>
        ));
    };

    const PairItem: FC<{ pair: Pair }> = ({ pair }) => {
        const [isActivePair, setIsActivePair] = useState(pair.id === "BINANCE");

        const handlePairClick = (pair: Pair) => {
            // setActivePair(pair);
            pair && true;
            setIsActivePair(true);
        };

        return (
            <button
                key={pair.id}
                className={styles.navButton}
                onClick={() => handlePairClick(pair)}
            >
                <CurrencyIcon baseimg={pair.baseimg} quoteimg={pair.quoteimg} />
                <div className={styles.content}>
                    <div className={styles.content_info}>
                        <div className={styles.content_info_title}>
                            {pair.base}
                            <span>{pair.quote}</span>
                        </div>
                    </div>
                    {isActivePair && <CheckmarkIcon />}
                </div>
            </button>
        );
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
