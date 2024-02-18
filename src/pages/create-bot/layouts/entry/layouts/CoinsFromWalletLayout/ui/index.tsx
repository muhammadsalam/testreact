import { Cell, CellListItem } from "shared/ui";
import styles from "./styles.module.scss";
import { handleInputFocus, handleInputScroll, tgApp } from "shared/lib";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/AppStore";
import { inputNumber } from "features/input-number";
import { useNavigate } from "react-router-dom";
import { addAlert, deleteAlert } from "entities/notification";
import { Dispatch } from "@reduxjs/toolkit";

export const CoinsFromWalletLayout = () => {
    const { existing_volume, purchase_price } = useSelector(
        (state: RootState) => state.newBot
    );
    const dispatch: Dispatch<any> = useDispatch();

    const [ExistingVolume, setExistingVolume] = useState("" + existing_volume);
    const handleExistingVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        inputNumber(
            e.target.value,
            setExistingVolume,
            "existing_volume",
            dispatch
        );
    };

    const [PurchasePrice, setPurchasePrice] = useState("" + purchase_price);
    const handlePurchasePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        inputNumber(
            e.target.value,
            setPurchasePrice,
            "purchase_price",
            dispatch
        );
    };

    const navigate = useNavigate();

    const validation = () => {
        if (
            !+existing_volume ||
            +existing_volume < 0 ||
            existing_volume.length === 0
        ) {
            dispatch(
                addAlert({
                    title: "Invalid Existing Volume (should be >0)",
                })
            );
            return false;
        }

        if (
            !+existing_volume ||
            +existing_volume <= 0 ||
            existing_volume.length === 0
        ) {
            dispatch(
                addAlert({
                    title: "Invalid Purchase Price (should be >0)",
                })
            );
            return false;
        }
        return true;
    };

    useEffect(() => {
        const mainButtonHandler = () => {
            if (validation()) {
                dispatch(deleteAlert());
                navigate("/createbot/step3");
            }
        };
        tgApp.MainButton.onClick(mainButtonHandler);
        return () => {
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, [existing_volume, purchase_price]);

    return (
        <Cell>
            <CellListItem>
                <p>Existing volume</p>
                <input
                    type="number"
                    inputMode="numeric"
                    className={styles.input}
                    onFocus={handleInputFocus}
                    onClick={handleInputScroll}
                    value={ExistingVolume}
                    onChange={handleExistingVolume}
                />
            </CellListItem>
            <CellListItem>
                <p>Purchase price</p>
                <input
                    type="number"
                    inputMode="numeric"
                    className={styles.input}
                    onFocus={handleInputFocus}
                    onClick={handleInputScroll}
                    value={PurchasePrice}
                    onChange={handlePurchasePrice}
                />
            </CellListItem>
        </Cell>
    );
};
