import { Cell, CellListItem } from "shared/ui";
import styles from "./style.module.scss";
import { handleInputFocus, handleInputScroll, limitFloat } from "shared/lib";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/AppStore";
import { setField } from "pages/create-bot";

export const StopLossLayout = () => {
    const dispatch = useDispatch();
    const stop_loss = useSelector((state: RootState) => state.newBot.stop_loss);

    const [StopLoss, setStopLoss] = useState("" + stop_loss);
    const handleStopLoss = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = limitFloat(e.target.value, 2);
        setStopLoss(value);
        dispatch(setField({ field: "stop_loss", value: value }));
    };

    return (
        <Cell description="If a stop loss is triggered, the cycle will be interrupted">
            <CellListItem>
                <p className={styles.listItem_title}>Stop Loss, %</p>
                <input
                    type="number"
                    inputMode="decimal"
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
