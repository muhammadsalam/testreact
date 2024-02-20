import { tgApp } from "shared/lib";
import { FC, memo, useCallback, useEffect, useState } from "react";
import CheckmarkIcon from "../../../../../assets/icons/checkmark.svg?react";
import BinanceIcon from "assets/icons/binance.svg?react";
import { useSelector } from "react-redux";
import styles from "./styles.module.scss";
import { RootState } from "app/AppStore";
import { FlexWrapper } from "shared/ui";

const tempArrForKeys = [
    {
        title: "Binance",
        id: "BINANCE",
        hash: "0x8d5...e2dE",
    },
    {
        title: "Binance Testnet",
        id: "BINANCE_TESTNET",
        hash: "0x8d5...e2sE",
    },
    {
        title: "Binance",
        id: "BINANCE",
        hash: "0x8d5...e3dE",
    },
];

const KeyItem: FC<{
    item: {
        title: string;
        id: string;
        hash: string;
    };
    isActive: any;
    setLocalActiveKey: (value: any) => void;
}> = memo(({ isActive, setLocalActiveKey, item }) => {
    const handlePairClick = useCallback(
        (key: { title: string; id: string; hash: string }) => {
            if (isActive) return;
            setLocalActiveKey(key);
        },
        [isActive, setLocalActiveKey, item]
    );

    return (
        <button className={styles.item} onClick={() => handlePairClick(item)}>
            <BinanceIcon />
            <FlexWrapper className={styles.item_info_wrapper}>
                <div className={styles.item_info}>
                    <div className={styles.item_info_title}>{item.title}</div>
                    <div className={styles.item_info_ph}>
                        API key: {item.hash}
                    </div>
                </div>
                {isActive && <CheckmarkIcon className={styles.item_check} />}
            </FlexWrapper>
        </button>
    );
});

export const KeysListLayout = () => {
    // const dispatch = useDispatch();

    const exchange_type = useSelector(
        (state: RootState) => state.user.data.exchange_type
    );
    const [localActiveKey, setLocalActiveKey] = useState({
        title: exchange_type,
        id: exchange_type,
        hash: "0x8d5...e2dE",
    });

    useEffect(() => {
        const backButtonHandler = () => {
            window.history.back();
        };
        tgApp.BackButton.onClick(backButtonHandler);

        const mainButtonHandler = () => {
            // dispatch(setActive(localActiveKey)); // когда будет готово API
            // пока нельзя выбрать, потому что API не готово
            window.history.back();
        };
        tgApp.MainButton.onClick(mainButtonHandler);
        tgApp.MainButton.text = "Done";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, [localActiveKey]);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h1 className={styles.top_title}>API Keys</h1>
            </div>

            <div className={styles.content}>
                {tempArrForKeys.map((keyItem, index) => (
                    <KeyItem
                        item={keyItem}
                        isActive={localActiveKey.hash === keyItem.hash}
                        key={index}
                        setLocalActiveKey={setLocalActiveKey}
                    />
                ))}
            </div>
        </div>
    );
};
