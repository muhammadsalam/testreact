import clsx from "clsx";
import styles from "./ui.module.scss";
import { useSwitch } from "../libs/use-switch";

export const Switcher = () => {
    const switcher = useSwitch();

    return (
        <div
            onClick={switcher.handle}
            className={clsx(
                styles.switcher,
                switcher.state && styles.switcher__active
            )}
        >
            <span className={styles.switcher_slick}></span>
        </div>
    );
};
