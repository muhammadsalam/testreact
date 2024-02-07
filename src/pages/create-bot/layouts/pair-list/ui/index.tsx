import { Cell, CurrencyIcon } from "shared/ui";
import styles from "./style.module.scss";
import { handleInputFocus, handleInputScroll, tgApp } from "shared/lib";
import { ChangeEvent, FC, useEffect, useState } from "react";
import CheckmarkIcon from "../../../../../assets/icons/checkmark.svg?react";
import { useDispatch, useSelector } from "react-redux";
import { setActive } from "../model/pairSlice";

export interface Pair {
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
    const dispatch = useDispatch();

    // const {
    //     bot: { pair },
    //     setBot,
    // } = useBot();

    const { activePair } = useSelector((state: any) => state.pairs);
    const [localActivePair, setLocalActivePair] = useState(activePair);
    const [pairList, setPairList] = useState<Pair[]>([]);
    const [newPairList, setNewPairList] = useState<Pair[]>(pairList);

    const { list } = useSelector((state: any) => state.pairs);
    useEffect(() => {
        setPairList(list);
        setNewPairList(list);
    }, [list]);

    const [searchValue, setSearchValue] = useState<string>("");
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        handleNewPairListRender(e.target.value);
    };

    const handleNewPairListRender = (value: string) => {
        setNewPairList(
            pairList.filter((item) => item.id.match(value.toUpperCase()))
        );
    };

    useEffect(() => {
        const backButtonHandler = () => {
            window.history.back();
        };
        tgApp.BackButton.onClick(backButtonHandler);

        const mainButtonHandler = () => {
            dispatch(setActive(localActivePair));
            window.location.hash = "#1";
        };
        tgApp.MainButton.onClick(mainButtonHandler);
        tgApp.MainButton.text = "Done";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, [localActivePair]);

    console.log(tgApp.initData);

    const ListPairRender = () => {
        return newPairList.map((pairItem) => (
            <PairItem key={pairItem.id} pair={pairItem} />
        ));
    };

    const PairItem: FC<{ pair: Pair }> = ({ pair }) => {
        const [isActivePair, setIsActivePair] = useState(
            localActivePair.id === pair.id
        );

        const handlePairClick = (pair: Pair) => {
            if (pair.id === localActivePair.id) return;
            setLocalActivePair(pair);
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
