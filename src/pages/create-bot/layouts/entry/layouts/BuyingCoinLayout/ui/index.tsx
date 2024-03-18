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
    const { amount_first_order, price_first_order, type_first_order, pair } =
        useSelector((state: RootState) => state.newBot);

    const dispatch: AppDispatch = useDispatch();

    const [amountInputType, setAmountInputType] =
        useState<string>(amount_first_order);
    const handleITChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        setAmountInputType(value);
        const isFloated = value.split(".")[1] !== "";
        // если есть дробная часть и оно не NaN отменяем диспатч
        if (!isFloated && isNaN(+value)) return;
        dispatch(
            setField({
                field: "amount_first_order",
                value: !isFloated ? "" + +value : value,
            })
        );
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
        let value = e.target.value.replace(",", ".");
        const regexp = new RegExp(
            `^\\d*(\\.\\d{0,${pair?.precision.quote}})?$`
        );
        if (!regexp.test(value)) return;

        if (
            (!(value.includes("0.") || value.includes("0,")) &&
                value.startsWith("0") &&
                value.length > 1) ||
            /^\D/.test(value)
        ) {
            value = value.slice(1);
            e.target.value = value;
        }

        setAmountFO(value);
        const isFloated = value.split(".")[1] !== "";
        // если есть дробная часть и оно не NaN отменяем диспатч
        if (!isFloated && isNaN(+value)) return;
        dispatch(
            setField({
                field: "price_first_order",
                value: !isFloated ? "" + +value : value,
            })
        );
    };

    const validation = () => {
        if (pair?.limits.cost.max) {
            if (
                pair !== null &&
                (+amount_first_order < pair?.limits.cost.min ||
                    +amount_first_order > pair?.limits.cost.max)
            ) {
                dispatch(
                    addAlert({
                        title: `The entry order volume must be from ${pair.limits.cost.min} to ${pair.limits.cost.max}`,
                    })
                );
                return false;
            }
        } else {
            if (pair !== null && +amount_first_order < pair?.limits.cost.min) {
                dispatch(
                    addAlert({
                        title: `The entry order volume must be greater than ${pair.limits.cost.min}`,
                    })
                );
                return false;
            }
        }

        if (+price_first_order <= 0 && type_first_order === "LIMIT") {
            dispatch(
                addAlert({
                    title: 'The "Price for a limit order" field value must be greater than 0',
                })
            );
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
            <Cell
                description={`Min ${pair?.limits.cost.min} USDT ${
                    pair?.limits.cost.max
                        ? `/ Max ${pair?.limits.cost.max} USDT`
                        : ""
                }`}
            >
                <CellListItem>
                    <p className={styles.list_item_title}>
                        Volume of the entry order
                    </p>
                    <input
                        type="text"
                        inputMode="decimal"
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
                        type="text"
                        inputMode="decimal"
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
