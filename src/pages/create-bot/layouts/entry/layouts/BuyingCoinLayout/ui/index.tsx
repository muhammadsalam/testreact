import { Cell, CellListItem, Dropdown } from "shared/ui";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/AppStore";
import { setField } from "pages/create-bot";
import { handleInputFocus, handleInputScroll, tgApp } from "shared/lib";
import clsx from "clsx";
import { addAlert, deleteAlert } from "entities/notification";
import { useNavigate } from "react-router-dom";

const firstOrderItems = [
    {
        title: "Limit order",
        id: "LIMIT",
    },
    {
        title: "Market order",
        id: "MARKET",
    },
];

export const BuyingCoinLayout = () => {
    const { amount_first_order, price_first_order, type_first_order } =
        useSelector((state: RootState) => state.newBot);

    const dispatch: AppDispatch = useDispatch();

    const [amountInputType, setAmountInputType] =
        useState<string>(amount_first_order);
    const handleITChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        setAmountInputType(value);
        dispatch(setField({ field: "amount_first_order", value }));
    };

    const onFirstOrderTypeSwitch = (item: {
        title: string;
        id: string;
        disabled?: boolean;
    }) => {
        dispatch(setField({ field: "type_first_order", value: item.id }));
    };

    const [amountFO, setAmountFO] = useState<string>(price_first_order);
    const handleFOChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        setAmountFO(value);
        dispatch(setField({ field: "price_first_order", value }));
    };

    const validation = () => {
        if (+amount_first_order <= 20) {
            dispatch(
                addAlert({
                    title: "Invalid volume of the first order (should be не меньше 20) [потом изменится через бэк]",
                })
            );
            return false;
        }
        if (+price_first_order <= 0 && type_first_order === "LIMIT") {
            dispatch(addAlert({ title: "Invalid Price" }));
            return false;
        }
        return true;
    };

    const navigate = useNavigate();

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
    }, [amount_first_order, price_first_order, type_first_order]);

    return (
        <>
            <Cell description="Min 5.03 USDT / 0.00021 BTC">
                <CellListItem>
                    <p className={styles.list_item_title}>
                        Volume of the entry order
                    </p>
                    <input
                        type="number"
                        inputMode="numeric"
                        className={styles.list_item_input}
                        value={amountInputType}
                        onChange={handleITChange}
                        onFocus={handleInputFocus}
                        onClick={handleInputScroll}
                    />
                </CellListItem>
            </Cell>

            <Cell>
                <CellListItem>
                    <p className={styles.list_item_title}>
                        Type of the first order
                    </p>
                    <Dropdown
                        onSwitch={onFirstOrderTypeSwitch}
                        items={firstOrderItems}
                        defaultValueIndex={firstOrderItems.findIndex(
                            (item) => item.id === type_first_order
                        )}
                    />
                </CellListItem>

                <CellListItem
                    className={clsx(styles.listItem_wrapper, {
                        [styles.listItem_wrapper__active]:
                            type_first_order === "LIMIT",
                    })}
                    topBottomPadding={
                        type_first_order === "LIMIT" ? undefined : 0
                    }
                >
                    <p className={styles.list_item_title}>
                        Price for a limit order
                    </p>
                    <input
                        type="number"
                        inputMode="numeric"
                        className={styles.list_item_input}
                        value={amountFO}
                        onChange={handleFOChange}
                        onFocus={handleInputFocus}
                        onClick={handleInputScroll}
                    />
                </CellListItem>
            </Cell>
        </>
    );
};
