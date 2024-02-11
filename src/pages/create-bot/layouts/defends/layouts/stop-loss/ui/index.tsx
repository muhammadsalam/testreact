import { Cell, CellListItem } from "shared/ui";
import styles from "./style.module.scss";
import { handleInputFocus, handleInputScroll } from "shared/lib";
import { inputNumber } from "features/input-number";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "app/AppStore";

export const StopLossLayout = () => {
    const stop_loss = useSelector((state: RootState) => state.newBot.stop_loss);

    const [StopLoss, setStopLoss] = useState("" + stop_loss);
    const handleStopLoss = (e: React.ChangeEvent<HTMLInputElement>) => {
        inputNumber(e.target.value, setStopLoss, "stop_loss");
    };

    return (
        <Cell description="If a stop loss is triggered, the cycle will be interrupted">
            <CellListItem>
                <p className={styles.listItem_title}>Stop Loss, %</p>
                <input
                    type="number"
                    inputMode="numeric"
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
