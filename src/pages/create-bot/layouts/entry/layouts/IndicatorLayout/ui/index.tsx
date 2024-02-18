import styles from "./styles.module.scss";
import TimerIcon from "assets/icons/timer.svg?react";
import CloseIcon from "assets/icons/modal-close.svg?react";
import {
    Dispatch,
    FC,
    SetStateAction,
    useEffect,
    useRef,
    useState,
} from "react";
import { tgApp, useOutsideClick } from "shared/lib";

const IndicatorModal: FC<{
    setIsModalShow: Dispatch<SetStateAction<boolean>>;
}> = ({ setIsModalShow }) => {
    const modalRef = useRef<null | HTMLDivElement>(null);
    const [ideaField, setIdeaField] = useState("");

    useOutsideClick(modalRef, () => {
        setIsModalShow(false);
    });

    useEffect(() => {
        const mainButtonHandler = () => {
            // отправка идеи
            setIsModalShow(false);
        };

        tgApp.MainButton.onClick(mainButtonHandler);

        tgApp.MainButton.color = "rgba(0, 122, 255, 1)";
        tgApp.MainButton.text = "Send";

        return () => {
            tgApp.MainButton.offClick(mainButtonHandler);
            tgApp.MainButton.color = "rgba(232, 232, 233, 1)";
            tgApp.MainButton.text = "Next to step 3 / 6";
        };
    }, []);

    return (
        <div className={styles.modal}>
            <div className={styles.modal_wrapper} ref={modalRef}>
                <div className={styles.modal_top}>
                    <strong className={styles.modal_top_title}>
                        Your idea for indicators
                    </strong>
                    <button
                        onClick={() => setIsModalShow(false)}
                        className={styles.modal_top_btn}
                    >
                        <CloseIcon />
                    </button>
                </div>
                <textarea
                    className={styles.modal_textarea}
                    placeholder="Enter your idea..."
                    onChange={(e) => setIdeaField(e.target.value)}
                >
                    {ideaField}
                </textarea>
            </div>
        </div>
    );
};

export const IndicatorLayout = () => {
    const [isModalShow, setIsModalShow] = useState(false);

    useEffect(() => {
        tgApp.MainButton.color = "rgba(232, 232, 233, 1)";

        return () => {
            tgApp.MainButton.color = "rgba(0, 122, 255, 1)";
        };
    }, []);
    return (
        <>
            <div className={styles.block}>
                <TimerIcon />
                <strong className={styles.block_title}>Coming soon</strong>
                <p className={styles.block_ph}>
                    If you have ideas for indicators, write to us
                </p>
                <button
                    className={styles.block_btn}
                    onClick={() => setIsModalShow(true)}
                >
                    Suggest an idea
                </button>
            </div>
            {isModalShow && <IndicatorModal setIsModalShow={setIsModalShow} />}
        </>
    );
};
