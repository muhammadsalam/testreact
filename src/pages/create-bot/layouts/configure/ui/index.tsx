import { FC, useEffect, ChangeEvent, FocusEvent } from "react";
import styles from "./style.module.scss";
import { Cell, CellListItem, Switcher } from "shared/ui";
import ArrowRightIcon from "../../../../../assets/icons/arrow.svg?react";
import BtcusdtIcon from "../../../../../assets/icons/btcusdt.svg?react";
import ChartIcon from "../../../../../assets/icons/chart.svg?react";
import { useNavigate } from "react-router-dom";
import {
    handleInputFocus,
    handleInputScroll,
    tgApp,
    useSwitch,
} from "shared/lib";
import { useBot } from "pages/create-bot/libs";
// import axios from "axios";

export const ConfigureLayout: FC = () => {
    const navigate = useNavigate();
    useEffect(() => {
        tgApp.BackButton.show();

        const backButtonHandler = () => {
            tgApp.BackButton.hide();
            navigate("/");
        };
        tgApp.BackButton.onClick(backButtonHandler);

        const mainButtonHandler = () => {
            window.location.hash = "#2";
        };
        tgApp.MainButton.onClick(mainButtonHandler);

        tgApp.MainButton.show();
        tgApp.MainButton.text = "Next to step 2 / 6";
        tgApp.MainButton.color = "#007AFF";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, []);

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
        bot: { title, active_buy, active_def, active_tp },
        setBot,
    } = useBot();

    const strategySwitch = useSwitch(active_buy);
    const defendsSwitch = useSwitch(active_def);
    const takeProfitSwitch = useSwitch(active_tp);

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
                    <Switcher switchData={strategySwitch} />
                </CellListItem>
                <CellListItem color="#000">
                    Defends
                    <Switcher switchData={defendsSwitch} />
                </CellListItem>
                <CellListItem color="#000">
                    Take Profit
                    <Switcher switchData={takeProfitSwitch} />
                </CellListItem>
            </Cell>
        </div>
    );
};
