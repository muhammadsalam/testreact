import { Cell, CellListItem } from "shared/ui";
import styles from "./style.module.scss";
import { handleInputFocus, handleInputScroll } from "shared/lib";
import { useBot } from "pages/create-bot/libs";
import { inputNumber } from "features/input-number";
import { useState } from "react";

export const StopLossLayout = () => {
    const {
        bot: { stop_loss },
        setBot,
    } = useBot();

    const [StopLoss, setStopLoss] = useState("" + stop_loss);
    const handleStopLoss = (e: React.ChangeEvent<HTMLInputElement>) => {
        inputNumber(e.target.value, setStopLoss, setBot, "io_count");
    };

    return (
        <Cell description="If a stop loss is triggered, the cycle will be interrupted">
            <CellListItem>
                <p className={styles.listItem_title}>Stop Loss, %</p>
                <input
                    type="number"
                    className={styles.listItem_input}
                    onFocus={handleInputFocus}
                    onClick={handleInputScroll}
                    value={StopLoss}
                    onChange={handleStopLoss}
                />
            </CellListItem>
        </Cell>
    );
};
