import { FC, useEffect, useRef } from "react";
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
import { entryDropdownTitles } from "shared/CONSTANT";

const entryDropdown = [
    {
        title: entryDropdownTitles.BUY_COIN,
        id: "BUY_COIN",
    },
    {
        title: entryDropdownTitles.USE_WALLET,
        id: "USE_WALLET",
    },
    {
        title: entryDropdownTitles.BY_INDICATOR,
        id: "BY_INDICATOR",
    },
];

export const EntryLayout: FC = () => {
    const navigate = useNavigate();

    const {
        amount_first_order,
        type_first_order,
        price_first_order,
        existing_volume,
        purchase_price,
        entry_type,
    } = useSelector((state: RootState) => state.newBot);

    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        const backButtonHandler = () => {
            dispatch(deleteAlert());
            navigate("/createbot/step1");
        };
        tgApp.BackButton.onClick(backButtonHandler);

        tgApp.MainButton.show();
        tgApp.MainButton.text = "Next to step 3 / 6";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
        };
    }, [
        entry_type,
        purchase_price,
        price_first_order,
        type_first_order,
        amount_first_order,
        existing_volume,
    ]);

    const firstOrderTypeRef = useRef(null);

    const render = () => {
        switch (entry_type.id) {
            case "BUY_COIN":
                return <BuyingCoinLayout />;
            case "USE_WALLET":
                return <CoinsFromWalletLayout />;
            case "BY_INDICATOR":
                return <IndicatorLayout />;
        }
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
                <CellListItem ref={firstOrderTypeRef}>
                    <p className={styles.black_color}>Type of first order</p>
                    <Dropdown
                        labelRef={firstOrderTypeRef}
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
