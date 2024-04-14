import { FC, useEffect } from "react";
import styles from "./styles.module.scss";
import { Cell, CellListItem } from "shared/ui";
import { RootState } from "app/AppStore";
import { useDispatch, useSelector } from "react-redux";
import { tgApp } from "shared/lib";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { createBot } from "pages/create-bot";
import { Dispatch } from "@reduxjs/toolkit";
import { deleteAlert } from "entities/notification";
import ErrorIcon from "assets/icons/error.svg?react";
import {
    definitionTypesDropdownTitles,
    inputTypesDropdownTitles,
    profitDropdownTitles,
    settingsDropdownTitles,
} from "shared/CONSTANT";

export const DetailsLayout: FC = () => {
    const botData = useSelector((state: RootState) => state.newBot);
    const wallets = useSelector(
        (state: RootState) => state.user.data.wallets.data
    );
    const token = useSelector((state: RootState) => state.user.token);
    const orders_error = botData.otherStates.orders_error;
    const orders = botData.orders;

    const navigate = useNavigate();
    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        const mainButtonHandler = () => {
            if (
                orders_error !== undefined &&
                typeof orders_error !== "string" &&
                orders_error.message
            ) {
                dispatch(createBot({ token, preCosting: true }));
                return;
            }
            if (orders !== null && orders_error === undefined) {
                dispatch(deleteAlert());
                dispatch(createBot({ token }));
                navigate("/");
            }
        };

        tgApp.MainButton.text =
            orders_error !== undefined && typeof orders_error !== "string"
                ? orders_error.mainButtonText
                : "Start";

        if (orders_error !== undefined && typeof orders_error === "string") {
            tgApp.MainButton.textColor = "#fff";
            tgApp.MainButton.color = "#E8E8E9";
        }

        tgApp.MainButton.onClick(mainButtonHandler);

        return () => {
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, [orders_error, orders]);

    useEffect(() => {
        tgApp.MainButton.show();
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <p className={styles.top_title}>Bot details</p>
                <p className={styles.top_subtitle}>
                    Check all parameters before starting the bot
                </p>
            </div>
            <Cell title="Basic settings">
                <CellListItem>
                    Bot name
                    <span className={styles.black_color}>{botData.title}</span>
                </CellListItem>
                <CellListItem>
                    <div className={styles.listItem_stretch}>API Key</div>
                    <div className={styles.listItem_block}>
                        <span className={styles.black_color}>
                            {
                                wallets.find(
                                    (item) => item.id === botData.wallet_id
                                )?.title
                            }
                        </span>
                        <span className={styles.listItem_block_span}>
                            API key:
                            {
                                wallets.find(
                                    (item) => item.id === botData.wallet_id
                                )?.api_key
                            }
                        </span>
                    </div>
                </CellListItem>
                <CellListItem>
                    Pair
                    <span className={styles.black_color}>
                        {botData.pair?.id}
                    </span>
                </CellListItem>
                <CellListItem>
                    Trade
                    <span className={styles.black_color}>
                        {botData.strategy === "LONG" && "Long"}
                    </span>
                </CellListItem>
            </Cell>
            <Cell title="Entry">
                <CellListItem>
                    Type of first order
                    <span className={styles.black_color}>
                        {botData.entry_type.title}
                    </span>
                </CellListItem>
                {botData.entry_type.id === "BUY_COIN" && (
                    <>
                        <CellListItem>
                            Volume of the first order
                            <span className={styles.black_color}>
                                {botData.amount_first_order}
                            </span>
                        </CellListItem>
                        <CellListItem>
                            Type of the first order
                            <span className={styles.black_color}>
                                {botData.type_first_order}
                            </span>
                        </CellListItem>

                        {botData.type_first_order === "LIMIT" && (
                            <CellListItem>
                                Price for a limit order
                                <span className={styles.black_color}>
                                    {botData.price_first_order}
                                </span>
                            </CellListItem>
                        )}
                    </>
                )}
                {botData.entry_type.id === "USE_WALLET" && (
                    <>
                        <CellListItem>
                            Existing volume
                            <span className={styles.black_color}>
                                {botData.existing_volume}
                            </span>
                        </CellListItem>
                        <CellListItem>
                            Purchase price
                            <span className={styles.black_color}>
                                {botData.purchase_price}
                            </span>
                        </CellListItem>
                    </>
                )}
            </Cell>

            {botData.def_type.id !== "NONE" && (
                <Cell title="Defends">
                    <CellListItem>
                        Type
                        <span className={styles.black_color}>
                            {botData.def_type.title}
                        </span>
                    </CellListItem>
                    {botData.def_type.id === "IO" && (
                        <>
                            <CellListItem>
                                Input type
                                <span className={styles.black_color}>
                                    {
                                        inputTypesDropdownTitles[
                                            botData.io_calculate_type
                                        ]
                                    }
                                </span>
                            </CellListItem>
                            <CellListItem>
                                Limit of insurance orders
                                <span className={styles.black_color}>
                                    {botData.io_count}
                                </span>
                            </CellListItem>
                            <CellListItem>
                                Step of insurance orders, %
                                <span className={styles.black_color}>
                                    {botData.io_step}
                                </span>
                            </CellListItem>
                            <CellListItem>
                                Martingale
                                <span className={styles.black_color}>
                                    {botData.io_mrt}
                                </span>
                            </CellListItem>
                            <CellListItem>
                                Dynamic price step CO
                                <span className={styles.black_color}>
                                    {botData.io_step_mrt}
                                </span>
                            </CellListItem>
                        </>
                    )}
                    {botData.def_type.id === "SL" && (
                        <>
                            <CellListItem>
                                Stop Loss, %
                                <span className={styles.black_color}>
                                    {botData.stop_loss}
                                </span>
                            </CellListItem>
                        </>
                    )}
                </Cell>
            )}

            {botData.take_type !== "NONE" && (
                <Cell title="Take Profit">
                    <CellListItem>
                        Type
                        <span className={styles.black_color}>
                            {profitDropdownTitles[botData.take_type]}
                        </span>
                    </CellListItem>
                    {botData.take_type === "AUTO" && (
                        <>
                            <CellListItem>
                                Take Profit, %
                                <span className={styles.black_color}>
                                    {botData.take_profit}
                                </span>
                            </CellListItem>
                            <CellListItem>
                                Total amount for sale, %
                                <span className={styles.black_color}>
                                    {botData.take_amount_limit}
                                </span>
                            </CellListItem>
                            <CellListItem>
                                First Take Profit quantity, %
                                <span className={styles.black_color}>
                                    {botData.take_amount}
                                </span>
                            </CellListItem>
                            <CellListItem>
                                Step Take Profit
                                <span className={styles.black_color}>
                                    {botData.take_step}
                                </span>
                            </CellListItem>
                            <CellListItem>
                                Martingale
                                <span className={styles.black_color}>
                                    {botData.take_mrt}
                                </span>
                            </CellListItem>
                        </>
                    )}
                </Cell>
            )}

            {botData.take_type === "MANUAL" &&
                botData.takes.map((takeItem, index) => (
                    <Cell
                        title={"Take Profit • Step " + (index + 1)}
                        key={index}
                    >
                        <CellListItem>
                            Intermediate Take Profit, %
                            <span className={styles.black_color}>
                                {takeItem.step}
                            </span>
                        </CellListItem>
                        <CellListItem>
                            Amount, %
                            <span className={styles.black_color}>
                                {takeItem.amount}
                            </span>
                        </CellListItem>
                    </Cell>
                ))}

            <Cell title="Duration">
                <CellListItem>
                    Full сycles
                    <span className={styles.black_color}>
                        {botData.cycles.count}
                    </span>
                </CellListItem>
                {botData.cycles.count > 1 && (
                    <>
                        <CellListItem>
                            Price definition type
                            <span className={styles.black_color}>
                                {
                                    settingsDropdownTitles[
                                        botData.cycles.input_type
                                    ]
                                }
                            </span>
                        </CellListItem>
                        {botData.cycles.input_type === "FIXED" && (
                            <CellListItem>
                                Price
                                <span className={styles.black_color}>
                                    {botData.cycles.fixed_price}
                                </span>
                            </CellListItem>
                        )}
                        {botData.cycles.input_type === "CORRECTION" && (
                            <CellListItem>
                                Correction, %
                                <span className={styles.black_color}>
                                    {botData.cycles.correction}
                                </span>
                            </CellListItem>
                        )}

                        <CellListItem>
                            Volume definition type
                            <span className={styles.black_color}>
                                {
                                    definitionTypesDropdownTitles[
                                        botData.cycles.amount_type
                                    ]
                                }
                            </span>
                        </CellListItem>
                        {botData.cycles.amount_type === "FIXED" && (
                            <CellListItem>
                                Entry volume
                                <span className={styles.black_color}>
                                    {botData.cycles.fixed_amount}
                                </span>
                            </CellListItem>
                        )}
                    </>
                )}
            </Cell>

            {orders_error === undefined ? (
                <Cell listClass={false}>
                    <div className={styles.buttonsCell}>
                        {orders?.find((a) => a.type !== "TAKE_PROFIT") && (
                            <Link
                                to="insurance-grid"
                                className={styles.buttonsCell_item}
                            >
                                Insurance Order Grid
                            </Link>
                        )}
                        {orders?.find((a) => a.type === "TAKE_PROFIT") && (
                            <Link
                                to="profit-grid"
                                className={styles.buttonsCell_item}
                            >
                                Take Profit Grid
                            </Link>
                        )}
                    </div>
                </Cell>
            ) : (
                <div className={styles.errorBlock}>
                    <ErrorIcon />
                    <p className={styles.errorBlock_text}>
                        {typeof orders_error === "string"
                            ? orders_error
                            : orders_error.message}
                    </p>
                </div>
            )}
        </div>
    );
};
