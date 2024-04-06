import { Cell, CurrencyIcon } from "shared/ui";
import styles from "./style.module.scss";
import { handleInputFocus, handleInputScroll, tgApp } from "shared/lib";
import {
    ChangeEvent,
    FC,
    memo,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import CheckmarkIcon from "../../../../../assets/icons/checkmark.svg?react";
import CloseIcon from "assets/icons/close.svg?react";
import { useDispatch, useSelector } from "react-redux";
import { setField } from "pages/create-bot";
import { AppDispatch, RootState } from "app/AppStore";
import { pairFieldsReset } from "../model/pairSlice";
import { Loader } from "widgets/loader";
// import debounce from "lodash.debounce";
// import { fetchPairs } from "../model/pairSlice";

export interface Pair {
    id: string;
    symbol: string;
    base: string;
    quote: string;
    baseimg: string;
    quoteimg: string;
    precision: {
        amount: number;
        price: number;
        base: number;
        quote: number;
    };
    limits: {
        amount: {
            min: number;
            max: number;
        };
        cost: {
            min: number;
            max: number | null;
        };
    };
}

const PairItem: FC<{
    pair: Pair;
    isActive: any;
    setLocalActivePair: (value: Pair) => void;
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
    const dispatch: AppDispatch = useDispatch();

    const pairs = useSelector((state: RootState) => state.pairs);
    const activePair = useSelector((state: RootState) => state.newBot.pair);
    const [localActivePair, setLocalActivePair] = useState(activePair);

    // const updateSearch = useCallback(
    //     debounce((value: string) => {
    //         dispatch(fetchPairs(value));
    //     }, 800),
    //     []
    // );

    const [searchValue, setSearchValue] = useState<string>("");

    const handleSearchValue = ({
        target: { value },
    }: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(value);
        // updateSearch(value);
    };

    const filteredPairList = useMemo(
        () =>
            pairs.filter((item: Pair) =>
                item.id.toUpperCase().includes(searchValue.toUpperCase())
            ),
        [pairs, searchValue]
    );

    useEffect(() => {
        const backButtonHandler = () => {
            window.history.back();
        };
        tgApp.BackButton.onClick(backButtonHandler);

        const mainButtonHandler = () => {
            dispatch(setField({ field: "pair", value: localActivePair }));
            dispatch(pairFieldsReset());
            window.history.back();
        };
        tgApp.MainButton.show();
        tgApp.MainButton.onClick(mainButtonHandler);
        tgApp.MainButton.text = "Done";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, [localActivePair]);

    if (!pairs.length) return <Loader />;

    return (
        <div className={styles.container}>
            <div className={styles.input_wrapper}>
                <input
                    type="text"
                    placeholder="Pair search"
                    className={styles.input}
                    value={searchValue}
                    onClick={handleInputScroll}
                    onFocus={handleInputFocus}
                    onChange={handleSearchValue}
                />
                <CloseIcon
                    className={styles.input_close}
                    onClick={() => {
                        setSearchValue("");
                    }}
                />
            </div>
            {filteredPairList.length > 0 && (
                <Cell title="list of pairs">
                    {filteredPairList.map((pairItem: Pair) => (
                        <PairItem
                            key={pairItem.symbol}
                            pair={pairItem}
                            isActive={
                                pairItem.symbol === localActivePair?.symbol
                            }
                            setLocalActivePair={setLocalActivePair}
                        />
                    ))}
                </Cell>
            )}
        </div>
    );
};
