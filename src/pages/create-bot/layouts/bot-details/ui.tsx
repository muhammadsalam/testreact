import { FC, useEffect } from "react";
import styles from "./styles.module.scss";
import { Cell, CellListItem } from "shared/ui";
import { RootState } from "app/AppStore";
import { useSelector } from "react-redux";
import { tgApp } from "shared/lib";
import { useNavigate } from "react-router-dom";

export const BotDetailsPage: FC = () => {
    const botData = useSelector((state: RootState) => state.newBot);
    const wallets = useSelector(
        (state: RootState) => state.user.data.wallets.data
    );

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
                            {
                                wallets.find(
                                    (item) => item.id === botData.wallet_id
                                )?.exchange
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
                {botData.entry_type.id === "BUYING_COIN" && (
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
                {botData.entry_type.id === "COINS_FROM_WALLET" && (
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

            {botData.take_type !== "NONE" && (
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
                    <span className={styles.black_color}>
                        {botData.cycles.count}
                    </span>
                </CellListItem>
                {botData.cycles.count > 1 && (
                    <>
                        <CellListItem>
                            Price definition type
                            <span className={styles.black_color}>
                                {botData.cycles.input_type}
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
                                cycles&gt;correction
                                <span className={styles.black_color}>
                                    {botData.cycles.correction}
                                </span>
                            </CellListItem>
                        )}

                        <CellListItem>
                            Volume definition type
                            <span className={styles.black_color}>
                                {botData.cycles.amount_type}
                            </span>
                        </CellListItem>
                        {botData.cycles.amount_type === "DYNAMIC" && (
                            <CellListItem>
                                Entry volume, %
                                <span className={styles.black_color}>
                                    {botData.cycles.dynamic_amount}
                                </span>
                            </CellListItem>
                        )}
                        {botData.cycles.amount_type === "FIXED" && (
                            <CellListItem>
                                cycles&gt;fixed_amount
                                <span className={styles.black_color}>
                                    {botData.cycles.fixed_amount}
                                </span>
                            </CellListItem>
                        )}
                    </>
                )}
            </Cell>
        </div>
    );
};
