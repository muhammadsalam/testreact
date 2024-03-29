import { FC } from "react";
import styles from "./style.module.scss";
import { API_URL } from "shared/CONSTANT";

export const CurrencyIcon: FC<{ baseimg: string; quoteimg: string }> = ({
    baseimg,
    quoteimg,
}) => {
    return (
        <div className={styles.iconWrapper}>
            <img
                src={API_URL + quoteimg}
                alt="quote"
                className={styles.quoteIcon}
            />
            <img
                src={API_URL + baseimg}
                alt="base"
                className={styles.baseIcon}
            />
        </div>
    );
};
