import { BotData } from "pages/bot";
import { FC } from "react";
import styles from "./styles.module.scss";
import { Cell, CellListItem } from "shared/ui";
import { useSelector } from "react-redux";
import { RootState } from "app/AppStore";
import {
    defendsDropdownTitles,
    definitionTypesDropdownTitles,
    entryDropdownTitles,
    firstOrderDropdownTitles,
    inputTypesDropdownTitles,
    profitDropdownTitles,
    settingsDropdownTitles,
} from "shared/CONSTANT";

export const BotDetailsLayout: FC<{ botData: BotData | null }> = ({
    botData,
}) => {
    if (botData === null) return;

    const wallets = useSelector(
        (state: RootState) => state.user.data.wallets.data
    );

    return (
        <>
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
                    <span className={styles.black_color}>{botData.pair}</span>
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
                        {entryDropdownTitles[botData.entry_type]}
                    </span>
                </CellListItem>
                {botData.entry_type === "BUY_COIN" && (
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
                                {
                                    firstOrderDropdownTitles[
                                        botData.type_first_order
                                    ]
                                }
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
                {botData.entry_type === "USE_WALLET" && (
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

            {botData.def_type !== "NONE" && (
                <Cell title="Defends">
                    <CellListItem>
                        Type
                        <span className={styles.black_color}>
                            {defendsDropdownTitles[botData.def_type]}
                        </span>
                    </CellListItem>
                    {botData.def_type === "IO" && (
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
                    {botData.def_type === "SL" && (
                        <CellListItem>
                            Stop Loss, %
                            <span className={styles.black_color}>
                                {botData.stop_loss}
                            </span>
                        </CellListItem>
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
                        {botData.cycle_count}
                    </span>
                </CellListItem>
                {botData.cycle_count > 1 && (
                    <>
                        <CellListItem>
                            Price definition type
                            <span className={styles.black_color}>
                                {
                                    settingsDropdownTitles[
                                        botData.cycle_input_type
                                    ]
                                }
                            </span>
                        </CellListItem>
                        {botData.cycle_input_type === "FIXED" && (
                            <CellListItem>
                                Price
                                <span className={styles.black_color}>
                                    {botData.cycle_fixed_price}
                                </span>
                            </CellListItem>
                        )}
                        {botData.cycle_input_type === "CORRECTION" && (
                            <CellListItem>
                                Correction, %
                                <span className={styles.black_color}>
                                    {botData.cycle_correction}
                                </span>
                            </CellListItem>
                        )}

                        <CellListItem>
                            Volume definition type
                            <span className={styles.black_color}>
                                {
                                    definitionTypesDropdownTitles[
                                        botData.cycle_amount_type
                                    ]
                                }
                            </span>
                        </CellListItem>
                        {botData.cycle_amount_type === "FIXED" && (
                            <CellListItem>
                                Entry volume
                                <span className={styles.black_color}>
                                    {botData.cycle_fixed_amount}
                                </span>
                            </CellListItem>
                        )}
                    </>
                )}
            </Cell>
        </>
    );
};
