import { FC, useEffect } from "react";
import styles from "./style.module.scss";
import { Cell, CellListItem, Dropdown } from "shared/ui";
import { tgApp } from "shared/lib";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/AppStore";
import { setField } from "pages/create-bot";
import { deleteAlert } from "entities/notification";
import { Dispatch } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import {
    BuyingCoinLayout,
    CoinsFromWalletLayout,
    IndicatorLayout,
} from "../layouts";

const entryDropdown = [
    {
        title: "Buying a coin",
        id: "BUYING_COIN",
    },
    {
        title: "Сoins from wallet",
        id: "COINS_FROM_WALLET",
    },
    {
        title: "By indicator",
        id: "BY_INDICATOR",
        disabled: true,
    },
];

export const EntryLayout: FC = () => {
    const navigate = useNavigate();

    const {
        ammount_first_order,
        type_first_order,
        price_first_order,
        existing_volume,
        purchase_price,
        entry_type,
        active_def,
        active_tp,
    } = useSelector((state: RootState) => state.newBot);

    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        const backButtonHandler = () => {
            dispatch(deleteAlert());
            navigate("/createbot/step1");
        };
        tgApp.BackButton.onClick(backButtonHandler);
        tgApp.MainButton.text = "Next to step 3 / 6";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
        };
    }, [
        entry_type,
        active_def,
        active_tp,
        purchase_price,
        price_first_order,
        type_first_order,
        ammount_first_order,
        existing_volume,
    ]);

    const render = () => {
        if (entry_type.id === "BUYING_COIN") return <BuyingCoinLayout />;
        if (entry_type.id === "COINS_FROM_WALLET")
            return <CoinsFromWalletLayout />;
        if (entry_type.id === "BY_INDICATOR") return <IndicatorLayout />;
    };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <p className={styles.top_title}>Entry</p>
                <p className={styles.top_subtitle}>
                    Select the type of the first order to properly configure the
                    bot strategy
                </p>
            </div>

            <Cell description="Select the type of the first order to properly configure the bot strategy">
                <CellListItem>
                    <p className={styles.black_color}>Type of first order</p>
                    <Dropdown
                        onSwitch={(item) =>
                            dispatch(
                                setField({
                                    field: "entry_type",
                                    value: item,
                                })
                            )
                        }
                        defaultValueIndex={entryDropdown.findIndex(
                            (item) => item.id === entry_type.id
                        )}
                        items={entryDropdown}
                    />
                </CellListItem>
            </Cell>

            {render()}
        </div>
    );
};
