import styles from "./styles.module.scss";
import WalletIcon from "../../../assets/icons/wallet.svg?react";
import { useEffect } from "react";
import { tgApp } from "shared/lib";

export const Loader = () => {
    useEffect(() => {
        const isVisible = tgApp.MainButton.isVisible;
        console.log("before hiding", isVisible);
        setTimeout(() => {
            tgApp.MainButton.hide();
        }, 1);

        return () => {
            console.log("return", tgApp.MainButton.isVisible);
            if (isVisible) {
                setTimeout(() => {
                    tgApp.MainButton.show();
                }, 1);
                console.log("show", tgApp.MainButton.isVisible);
            }
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            <WalletIcon className={styles.icon} />
        </div>
    );
};
