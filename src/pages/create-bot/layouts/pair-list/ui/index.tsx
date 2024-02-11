import { Cell, CurrencyIcon } from "shared/ui";
import styles from "./style.module.scss";
import { handleInputFocus, handleInputScroll, tgApp } from "shared/lib";
import { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
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

const PairItem: FC<{
    pair: Pair;
    isActive: any;
    setLocalActivePair: (value: any) => void;
}> = memo(({ pair, isActive, setLocalActivePair }) => {
    const handlePairClick = useCallback(
        (pair: Pair) => {
            if (isActive) return;
            setLocalActivePair(pair);
        },
        [pair, isActive, setLocalActivePair]
    );

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
                {isActive && <CheckmarkIcon />}
            </div>
        </button>
    );
});

export const PairListLayout = () => {
    const dispatch = useDispatch();

    const { activePair, list } = useSelector((state: any) => state.pairs);
    const [localActivePair, setLocalActivePair] = useState(activePair);

    const [searchValue, setSearchValue] = useState<string>("");

    const filteredPairList = useMemo(
        () =>
            list.filter((item: Pair) =>
                item.id.match(searchValue.toUpperCase())
            ),
        [list, searchValue]
    );

    useEffect(() => {
        const backButtonHandler = () => {
            window.history.back();
        };
        tgApp.BackButton.onClick(backButtonHandler);

        const mainButtonHandler = () => {
            dispatch(setActive(localActivePair));
            window.history.back();
        };
        tgApp.MainButton.onClick(mainButtonHandler);
        tgApp.MainButton.text = "Done";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, [localActivePair]);

    return (
        <div className={styles.container}>
            <input
                type="text"
                placeholder="Pair search"
                className={styles.input}
                value={searchValue}
                onClick={handleInputScroll}
                onFocus={handleInputFocus}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <Cell title="list of pairs">
                {filteredPairList.map((pairItem: Pair) => (
                    <PairItem
                        key={pairItem.id}
                        pair={pairItem}
                        isActive={pairItem.id === localActivePair.id}
                        setLocalActivePair={setLocalActivePair}
                    />
                ))}
            </Cell>
        </div>
    );
};
