import { FC } from "react";
import styles from "./style.module.scss";

export const CurrencyIcon: FC<{ baseimg: string; quoteimg: string }> = ({
    baseimg,
    quoteimg,
}) => {
    return (
        <div className={styles.iconWrapper}>
            <img src={quoteimg} alt="quote" className={styles.quoteIcon} />
            <img src={baseimg} alt="base" className={styles.baseIcon} />
        </div>
    );
};
