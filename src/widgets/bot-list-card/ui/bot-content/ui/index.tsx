import { clsx } from "clsx";
import styles from "./style.module.scss";

export const BotContent = () => {
    return (
        <div className={styles.content}>
            <div className={styles.content_item}>
                <div className={styles.content_item_title}>Investment</div>
                <div className={styles.content_item_heading}>1000 $</div>
                <div className={styles.content_item_sub}>
                    Entry price 58 000 $
                </div>
            </div>
            <div className={styles.content_item}>
                <div className={styles.content_item_title}>Coin balance</div>
                <div className={styles.content_item_heading}>0.0010 BTC</div>
                <div className={styles.content_item_sub}>1 140 $</div>
            </div>
            <div className={styles.content_item}>
                <div className={styles.content_item_title}>Realized PnL</div>
                <div className={styles.content_item_heading}>
                    +650 $
                    <span className={styles.small_text_size}>(+65 %)</span>
                </div>
                <div className={styles.content_item_sub}>For 1 cycles</div>
            </div>
            <div className={styles.content_item}>
                <div className={styles.content_item_title}>Unrealized PnL</div>
                <div
                    className={clsx(
                        styles.content_item_heading,
                        styles.text_confirm_color
                    )}
                >
                    +140 $
                    <span className={styles.small_text_size}>(+14 %)</span>
                </div>
                <div className={styles.content_item_sub}>For cycle 2 / 5</div>
            </div>
        </div>
    );
};
