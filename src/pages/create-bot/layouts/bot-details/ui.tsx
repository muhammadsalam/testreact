import { FC, useEffect } from "react";
import styles from "./styles.module.scss";
import { Cell, CellListItem } from "shared/ui";
import { RootState } from "app/AppStore";
import { useSelector } from "react-redux";
import { tgApp } from "shared/lib";
import { useNavigate } from "react-router-dom";

export const BotDetailsPage: FC = () => {
    const botData = useSelector((state: RootState) => state.newBot);

    const navigate = useNavigate();

    useEffect(() => {
        const mainButtonHandler = () => {
            console.log("Start bot", botData);
            navigate("/");
        };

        tgApp.MainButton.text = "Start";

        tgApp.MainButton.onClick(mainButtonHandler);

        return () => {
            tgApp.MainButton.offClick(mainButtonHandler);
        };
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
                            Binance Testnet
                        </span>
                        <span className={styles.listItem_block_span}>
                            API key: 0x8d5...e2dE
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
                        {botData.active_buy.title}
                    </span>
                </CellListItem>
                {botData.active_buy.id === "BUYING_COIN" && (
                    <>
                        <CellListItem>
                            Volume of the first order
                            <span className={styles.black_color}>
                                {botData.ammount_first_order}
                            </span>
                        </CellListItem>
                        <CellListItem>
                            Type of the first order
                            <span className={styles.black_color}>
                                {botData.type_first_order === "LIMIT"
                                    ? "Limit Order"
                                    : "Market Order"}
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
                {botData.active_buy.id === "COINS_FROM_WALLET" && (
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

            {botData.def_type.id !== null && (
                <Cell title="Defends">
                    {botData.def_type.id === "IO" && (
                        <>
                            <CellListItem>
                                Type
                                <span className={styles.black_color}>
                                    Insurance orders
                                </span>
                            </CellListItem>
                            <CellListItem>
                                Limit of insurance orders
                                <span className={styles.black_color}>10</span>
                            </CellListItem>
                            <CellListItem>
                                Step of insurance orders, %
                                <span className={styles.black_color}>2</span>
                            </CellListItem>
                            <CellListItem>
                                Martingale
                                <span className={styles.black_color}>3.5</span>
                            </CellListItem>
                            <CellListItem>
                                Dynamic price step CO
                                <span className={styles.black_color}>2</span>
                            </CellListItem>
                        </>
                    )}
                    {botData.def_type.id === "SL" && (
                        <>
                            <CellListItem>
                                Type
                                <span className={styles.black_color}>
                                    Stop Loss
                                </span>
                            </CellListItem>
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

            {botData.take_type !== null && (
                <Cell title="Take Profit">
                    {botData.take_type === "MANUAL" && (
                        <CellListItem>
                            Type
                            <span className={styles.black_color}>Manually</span>
                        </CellListItem>
                    )}
                    {botData.take_type === "AUTO" && (
                        <>
                            <CellListItem>
                                Type
                                <span className={styles.black_color}>
                                    Automatic
                                </span>
                            </CellListItem>
                            <CellListItem>
                                Take Profit, %
                                <span className={styles.black_color}>
                                    {botData.take_profit}
                                </span>
                            </CellListItem>
                            <CellListItem>
                                Total amount for sale, %
                                <span className={styles.black_color}>
                                    100 (change)
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
                    <Cell title="Take Profit • Step 1" key={index}>
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
                    <span className={styles.black_color}>{botData.cycles}</span>
                </CellListItem>
                {botData.cycles > 1 && (
                    <>
                        <CellListItem>
                            Price definition type
                            <span className={styles.black_color}>
                                For a price
                            </span>
                        </CellListItem>
                        <CellListItem>
                            Price
                            <span className={styles.black_color}>1000</span>
                        </CellListItem>
                        <CellListItem>
                            Volume definition type
                            <span className={styles.black_color}>Percent</span>
                        </CellListItem>
                        <CellListItem>
                            Entry volume, %
                            <span className={styles.black_color}>1</span>
                        </CellListItem>
                    </>
                )}
            </Cell>
        </div>
    );
};
