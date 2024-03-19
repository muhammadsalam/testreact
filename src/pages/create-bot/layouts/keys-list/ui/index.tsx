import { tgApp } from "shared/lib";
import { FC, memo, useCallback, useEffect, useState } from "react";
import CheckmarkIcon from "../../../../../assets/icons/checkmark.svg?react";
import BinanceIcon from "assets/icons/binance.svg?react";
import styles from "./styles.module.scss";
import { FlexWrapper } from "shared/ui";
import { WalletType } from "shared/API/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/AppStore";
import { setField } from "pages/create-bot";
import { pairFieldsReset } from "../../pair-list/model/pairSlice";
import { Dispatch } from "@reduxjs/toolkit";

const KeyItem: FC<{
    item: WalletType;
    isActive: any;
    setLocalActiveKey: (value: any) => void;
}> = memo(({ isActive, setLocalActiveKey, item }) => {
    const handlePairClick = useCallback(
        (key: WalletType) => {
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
                        API key: {item.api_key}
                    </div>
                </div>
                {isActive && <CheckmarkIcon className={styles.item_check} />}
            </FlexWrapper>
        </button>
    );
});

export const KeysListLayout = () => {
    const dispatch: Dispatch<any> = useDispatch();
    const wallets = useSelector(
        (state: RootState) => state.user.data.wallets.data
    );
    const wallet_id = useSelector((state: RootState) => state.newBot.wallet_id);

    const [localActiveKey, setLocalActiveKey] = useState<WalletType>(
        wallets.find((wallet) => wallet.id === wallet_id) || {
            id: 0,
            exchange: "",
            api_key: "",
            title: "",
        }
    );

    useEffect(() => {
        const backButtonHandler = () => {
            window.history.back();
        };
        tgApp.BackButton.onClick(backButtonHandler);

        const mainButtonHandler = () => {
            dispatch(
                setField({ field: "wallet_id", value: localActiveKey.id })
            );
            dispatch(setField({ field: "pair", value: null }));
            dispatch(pairFieldsReset());

            // пока нельзя выбрать, потому что API не готово
            window.history.back();
        };
        tgApp.MainButton.show();
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
                {wallets.map((wallet) => (
                    <KeyItem
                        item={wallet}
                        isActive={localActiveKey.id === wallet.id}
                        key={wallet.id}
                        setLocalActiveKey={setLocalActiveKey}
                    />
                ))}
            </div>
        </div>
    );
};
