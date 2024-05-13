import { FC, useEffect, useRef } from "react";
import styles from "./style.module.scss";
import CloseIcon from "icons/close.svg?react";
import ExecutedIcon from "icons/order-executed.svg?react";
import CanceledIcon from "icons/order-canceled.svg?react";
import WaitIcon from "icons/order-wait.svg?react";
import clsx from "clsx";
import { useOutsideClick } from "shared/lib";

interface props {
    status: "executed" | "canceled" | string;
    title: string;
    data: string;
    handleClose: () => void;
}

export const OrderHistoryModal: FC<props> = ({
    status,
    title,
    data,
    handleClose,
}) => {
    const modalRef = useRef<null | HTMLDivElement>(null);
    useOutsideClick(modalRef, handleClose);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    const Icon = () => {
        switch (status.toLowerCase()) {
            case "executed":
                return <ExecutedIcon />;
            case "canceled":
                return <CanceledIcon />;
            default:
                return <WaitIcon />;
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.modal} ref={modalRef}>
                <button className={styles.closeButton} onClick={handleClose}>
                    <CloseIcon />
                </button>

                <div className={styles.top}>
                    <div className={styles.top_block}>
                        <Icon />
                        <div
                            className={clsx(styles.top_status, {
                                confirm_color:
                                    status.toLowerCase() === "executed",
                                destructive_color:
                                    status.toLowerCase() === "canceled",
                            })}
                        >
                            {status}
                        </div>
                    </div>
                    <div className={styles.top_block}>
                        <div className={styles.top_title}>{title}</div>
                        <div className={styles.top_data}>{data}</div>
                    </div>
                </div>

                <div className={styles.content}>
                    <div className={styles.content_row}>
                        <div className={styles.content_row_item}>Direction</div>
                        <div className={styles.content_row_empty}></div>
                        <div className={styles.content_row_item}>Buy</div>
                    </div>
                    <div className={styles.content_row}>
                        <div className={styles.content_row_item}>
                            Order type
                        </div>
                        <div className={styles.content_row_empty}></div>
                        <div className={styles.content_row_item}>MARKET</div>
                    </div>
                    <div className={styles.content_row}>
                        <div className={styles.content_row_item}>
                            Trade volume
                        </div>
                        <div className={styles.content_row_empty}></div>
                        <div className={styles.content_row_item}>0,001 BTC</div>
                    </div>
                    <div className={styles.content_row}>
                        <div className={styles.content_row_item}>
                            Entry price
                        </div>
                        <div className={styles.content_row_empty}></div>
                        <div className={styles.content_row_item}>
                            48 761,93 $
                        </div>
                    </div>
                    <div className={styles.content_row}>
                        <div className={styles.content_row_item}>
                            Purchase amount
                        </div>
                        <div className={styles.content_row_empty}></div>
                        <div className={styles.content_row_item}>100 $</div>
                    </div>
                    <div className={styles.content_row}>
                        <div className={styles.content_row_item}>Cycle</div>
                        <div className={styles.content_row_empty}></div>
                        <div className={styles.content_row_item}>1</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
