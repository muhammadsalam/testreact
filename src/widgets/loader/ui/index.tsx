import styles from "./styles.module.scss";
import WalletIcon from "../../../assets/icons/wallet.svg?react";

export const Loader = () => {
    return (
        <div className={styles.wrapper}>
            <WalletIcon className={styles.icon} />
        </div>
    );
};
