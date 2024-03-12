import { Cell, CellListItem } from "shared/ui";
import styles from "./styles.module.scss";
import { handleInputFocus, handleInputScroll, tgApp } from "shared/lib";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/AppStore";
import { useNavigate } from "react-router-dom";
import { addAlert, deleteAlert } from "entities/notification";
import { Dispatch } from "@reduxjs/toolkit";
import { setField } from "pages/create-bot";

export const CoinsFromWalletLayout = () => {
    const { existing_volume, purchase_price } = useSelector(
        (state: RootState) => state.newBot
    );
    const dispatch: Dispatch<any> = useDispatch();

    const [ExistingVolume, setExistingVolume] = useState("" + existing_volume);
    const handleExistingVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(",", ".");
        if (!/^\d*(\.\d{0,2})?$/.test(value)) return;

        if (
            (!(value.includes("0.") || value.includes("0,")) &&
                value.startsWith("0") &&
                value.length > 1) ||
            /^\D/.test(value)
        ) {
            value = value.slice(1);
            e.target.value = value;
        }

        setExistingVolume(value);
        const isFloated = value.split(".")[1] !== "";
        // если есть дробная часть и оно не NaN отменяем диспатч
        if (!isFloated && isNaN(+value)) return;

        dispatch(
            setField({
                field: "existing_volume",
                value: !isFloated ? "" + +value : value,
            })
        );
    };

    const [PurchasePrice, setPurchasePrice] = useState("" + purchase_price);
    const handlePurchasePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(",", ".");
        if (!/^\d*(\.\d{0,2})?$/.test(value)) return;

        if (
            (!(value.includes("0.") || value.includes("0,")) &&
                value.startsWith("0") &&
                value.length > 1) ||
            /^\D/.test(value)
        ) {
            value = value.slice(1);
            e.target.value = value;
        }

        setPurchasePrice(value);
        const isFloated = value.split(".")[1] !== "";
        // если есть дробная часть и оно не NaN отменяем диспатч
        if (!isFloated && isNaN(+value)) return;

        dispatch(
            setField({
                field: "purchase_price",
                value: !isFloated ? "" + +value : value,
            })
        );
    };

    const navigate = useNavigate();

    const validation = () => {
        if (
            !+existing_volume ||
            +existing_volume <= 0 ||
            existing_volume.length === 0
        ) {
            dispatch(
                addAlert({
                    title: 'The "Existing volume" field value must be greater than 0',
                })
            );
            return false;
        }

        if (
            !+purchase_price ||
            +purchase_price <= 0 ||
            purchase_price.length === 0
        ) {
            dispatch(
                addAlert({
                    title: 'The "Purchase price" field value must be greater than 0',
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
                    type="text"
                    inputMode="decimal"
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
                    type="text"
                    inputMode="decimal"
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
