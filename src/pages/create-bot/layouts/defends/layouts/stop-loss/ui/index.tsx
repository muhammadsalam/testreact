import { Cell, CellListItem } from "shared/ui";
import styles from "./style.module.scss";
import { handleInputFocus, handleInputScroll } from "shared/lib";

export const StopLossLayout = () => {
    return (
        <Cell description="If a stop loss is triggered, the cycle will be interrupted">
            <CellListItem>
                <p className={styles.listItem_title}>Stop Loss, %</p>
                <input
                    type="number"
                    className={styles.listItem_input}
                    onFocus={handleInputFocus}
                    onClick={handleInputScroll}
                    defaultValue={-10}
                />
            </CellListItem>
        </Cell>
    );
};
