import { Cell, CellListItem } from "shared/ui";
import styles from "./style.module.scss";
import { handleInputFocus, handleInputScroll } from "shared/lib";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/AppStore";
import { setField } from "pages/create-bot";

export const StopLossLayout = () => {
    const dispatch = useDispatch();
    const stop_loss = useSelector((state: RootState) => state.newBot.stop_loss);

    const [StopLoss, setStopLoss] = useState(stop_loss);
    const handleStopLoss = (e: React.ChangeEvent<HTMLInputElement>) => {
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

        setStopLoss(value);
        const isFloated = value.split(".")[1] !== "";
        // если есть дробная часть и оно не NaN отменяем диспатч
        if (!isFloated && isNaN(+value)) return;
        dispatch(
            setField({
                field: "stop_loss",
                value: !isFloated ? "" + +value : value,
            })
        );
    };

    return (
        <Cell description="If a stop loss is triggered, the cycle will be interrupted">
            <CellListItem>
                <p className={styles.listItem_title}>Stop Loss, %</p>
                <input
                    type="text"
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
