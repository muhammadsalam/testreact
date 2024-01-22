import { Cell, FlexWrapper } from "shared/ui";
import styles from "./style.module.scss";

export const StopLossLayout = () => {
    return (
        <Cell description="If a stop loss is triggered, the cycle will be interrupted">
            <div className={styles.blockList_item}>
                <FlexWrapper>
                    <p className={styles.blockList_item_title}>Stop Loss, %</p>
                    <span className={styles.blockList_item_span}>-10</span>
                </FlexWrapper>
            </div>
        </Cell>
    );
};
