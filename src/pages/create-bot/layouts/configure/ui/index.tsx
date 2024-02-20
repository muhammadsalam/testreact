import { FC, useEffect, ChangeEvent, FocusEvent } from "react";
import styles from "./style.module.scss";
import { Cell, CurrencyIcon } from "shared/ui";
import ArrowRightIcon from "assets/icons/arrow.svg?react";
import BinanceIcon from "assets/icons/binance.svg?react";
import ChartIcon from "assets/icons/chart.svg?react";
import { useNavigate } from "react-router-dom";
import { handleInputFocus, handleInputScroll, tgApp } from "shared/lib";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/AppStore";
import { setField } from "pages/create-bot/model/botSlice";
import { addAlert, deleteAlert } from "entities/notification";
import { Link } from "react-router-dom";
import { Dispatch } from "@reduxjs/toolkit";

export const ConfigureLayout: FC = () => {
    const navigate = useNavigate();

    const {
        newBot: { title, exchange_type },
        pairs: { activePair },
    } = useSelector((state: RootState) => state);

    const dispatch: Dispatch<any> = useDispatch();

    const validation = (): boolean => {
        const titleWithoutSpaces = title
            .replace(/^\s+|\s+$/g, "")
            .replace(/\s+/g, " ");
        if (titleWithoutSpaces.length < 3 || titleWithoutSpaces.length > 20) {
            dispatch(addAlert({ title: "Title must be between 3 and 20" }));
            dispatch(setField({ field: "title", value: titleWithoutSpaces }));
            return false;
        }
        // if (exchange_type === null) {
        //     dispatch(addAlert({ title: "Choose API Key" }));
        //     return false;
        // }

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
                dispatch(deleteAlert());
                navigate("/createbot/step2");
            }
        };
        tgApp.MainButton.onClick(mainButtonHandler);

        tgApp.MainButton.show();
        tgApp.MainButton.text = "Next to step 2 / 6";
        tgApp.MainButton.color = "#007AFF";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, [title, exchange_type]);

    const handleTitleChange = ({
        target: { value },
    }: ChangeEvent<HTMLInputElement>) => {
        dispatch(setField({ field: "title", value }));
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
                <label className={styles.input_label}>
                    <input
                        type="text"
                        value={title}
                        onClick={handleInputScroll}
                        onFocus={(e) => {
                            handleInputFocus(
                                e as unknown as FocusEvent<HTMLInputElement>
                            );
                        }}
                        onChange={(event) => handleTitleChange(event)}
                        className={styles.input}
                        placeholder="Bot name"
                    />
                </label>
            </Cell>

            <Cell title="API Key settings">
                <Link to={"keys-list"} className={styles.navButton}>
                    {exchange_type === null ? (
                        <div className={styles.content_title}>API Key</div>
                    ) : (
                        <div className={styles.content}>
                            <BinanceIcon />
                            <div className={styles.content_info}>
                                <div className={styles.content_info_title}>
                                    {exchange_type.title}
                                </div>
                            </div>
                        </div>
                    )}
                    <ArrowRightIcon className={styles.navButton_icon} />
                </Link>
            </Cell>

            <Cell title="pair" description="1 BTC = 26 280.25 ₮">
                <Link to={"pair-list"} className={styles.navButton}>
                    <div className={styles.content}>
                        <CurrencyIcon
                            baseimg={activePair.baseimg}
                            quoteimg={activePair.quoteimg}
                        />
                        <div className={styles.content_info}>
                            <div className={styles.content_info_title}>
                                {activePair.base}
                                <span>{activePair.quote}</span>
                            </div>
                        </div>
                    </div>
                    <ArrowRightIcon className={styles.navButton_icon} />
                </Link>
            </Cell>

            <Cell title="trade">
                <div className={styles.block}>
                    <ChartIcon />
                    Long
                </div>
            </Cell>
        </div>
    );
};
