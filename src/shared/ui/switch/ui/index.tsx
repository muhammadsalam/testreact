import { FC } from "react";
import styles from "./ui.module.scss";
import clsx from "clsx";

type SwitchData = {
    state: boolean;
    handle: () => void;
};

export const Switcher: FC<{ switchData: SwitchData }> = ({
    switchData: { state, handle },
}) => {
    return (
        <div
            onClick={() => handle()}
            className={clsx(styles.switcher, {
                [styles.switcher__active]: state,
            })}
        >
            <span className={styles.switcher_slick}></span>
        </div>
    );
};
