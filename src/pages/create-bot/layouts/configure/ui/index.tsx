import { FC, useEffect, ChangeEvent, FocusEvent } from "react";
import styles from "./style.module.scss";
import { Cell, CellListItem, Switcher } from "shared/ui";
import ArrowRightIcon from "../../../../../assets/icons/arrow.svg?react";
import BtcusdtIcon from "../../../../../assets/icons/btcusdt.svg?react";
import ChartIcon from "../../../../../assets/icons/chart.svg?react";
import { useNavigate } from "react-router-dom";
import { handleInputFocus, handleInputScroll, tgApp } from "shared/lib";
import { useBot } from "pages/create-bot/libs";
// import axios from "axios";

export const ConfigureLayout: FC = () => {
    const navigate = useNavigate();

    // useEffect(() => {
    //     const apiUrl =
    //         "https://back.anestheziabot.tra.infope9l.beget.tech/v1/token";

    //     const data = JSON.stringify({
    //         user_id: window.Telegram.WebApp.initData,
    //     });

    //     axios
    //         .post(apiUrl, data)
    //         .then(() => {
    //             // console.log("Отправился");
    //         })
    //         .catch((error: any) => {
    //             // console.log(error);
    //         });
    // }, []);

    const {
        addAlert,
        bot: { title, active_buy, active_def, active_tp },
        setBot,
    } = useBot();

    const handleContextSwitch = (
        key: "active_buy" | "active_def" | "active_tp",
        state?: boolean
    ) => {
        setBot((prevBot) => {
            const newState = state !== undefined ? state : !prevBot[key];
            if (key === "active_buy" && !newState) {
                return {
                    ...prevBot,
                    active_buy: false,
                    active_def: false,
                };
            } else if (key === "active_def" && newState) {
                return {
                    ...prevBot,
                    active_buy: true,
                    active_def: true,
                };
            } else {
                return {
                    ...prevBot,
                    [key]: newState,
                };
            }
        });
    };

    const handleStrategySwitch: (state?: boolean) => void = (state) => {
        handleContextSwitch("active_buy", state);
    };

    const handleDefendsSwitch: (state?: boolean) => void = (state) => {
        handleContextSwitch("active_def", state);
    };

    const handleTakeProfitSwitch: (state?: boolean) => void = (state) => {
        handleContextSwitch("active_tp", state);
    };

    const validation = (): boolean => {
        if (title.length < 3) {
            addAlert({ title: "Title must be at least 3 characters long" });
            return false;
        }
        return true;
    };

    useEffect(() => {
        tgApp.BackButton.show();

        const backButtonHandler = () => {
            tgApp.BackButton.hide();
            navigate("/");
        };
        tgApp.BackButton.onClick(backButtonHandler);

        const mainButtonHandler = () => {
            if (validation()) {
                if (active_buy) window.location.hash = "#2";
                else if (active_tp) window.location.hash = "#4";
                else window.location.hash = "#5";
            }
        };
        tgApp.MainButton.onClick(mainButtonHandler);

        tgApp.MainButton.show();
        tgApp.MainButton.text =
            "Next to step 2 / " + (3 + +active_buy + +active_def + +active_tp);
        tgApp.MainButton.color = "#007AFF";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, [active_buy, active_def, active_tp, title]);

    const handleTitleChange = ({
        target: { value },
    }: ChangeEvent<HTMLInputElement>) => {
        setBot((prevBot) => ({
            ...prevBot,
            title: value,
        }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <p className={styles.top_title}>Basic settings</p>
                <p className={styles.top_subtitle}>
                    Configure the buy settings for your anesthezia
                </p>
            </div>

            <Cell title="bot name">
                <input
                    type="text"
                    value={title}
                    onClick={(e) => {
                        handleInputScroll(e);
                        handleInputFocus(
                            e as unknown as FocusEvent<HTMLInputElement>
                        );
                    }}
                    onChange={(event) => handleTitleChange(event)}
                    className={styles.input}
                />
            </Cell>

            <Cell title="pair" description="1 BTC = 26 280.25 ₮">
                <button className={styles.navButton}>
                    <div className={styles.content}>
                        <BtcusdtIcon />
                        <div className={styles.content_info}>
                            <div className={styles.content_info_title}>
                                BTC<span>USDT</span>
                            </div>
                        </div>
                    </div>
                    <ArrowRightIcon className={styles.navButton_icon} />
                </button>
            </Cell>

            <Cell title="trade">
                <div className={styles.block}>
                    <ChartIcon />
                    Long
                </div>
            </Cell>

            <Cell title="additionally">
                <CellListItem color="#000">
                    Strategy
                    <Switcher
                        switchData={{
                            state: active_buy,
                            handle: handleStrategySwitch,
                        }}
                    />
                </CellListItem>
                <CellListItem color="#000">
                    Defends
                    <Switcher
                        switchData={{
                            state: active_def,
                            handle: handleDefendsSwitch,
                        }}
                    />
                </CellListItem>
                <CellListItem color="#000">
                    Take Profit
                    <Switcher
                        switchData={{
                            state: active_tp,
                            handle: handleTakeProfitSwitch,
                        }}
                    />
                </CellListItem>
            </Cell>
        </div>
    );
};
