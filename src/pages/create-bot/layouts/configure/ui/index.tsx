import { FC, useEffect, ChangeEvent, FocusEvent } from "react";
import styles from "./style.module.scss";
import { Cell, CellListItem, CurrencyIcon, Switcher } from "shared/ui";
import ArrowRightIcon from "assets/icons/arrow.svg?react";
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

    const { title, active_buy, active_def, active_tp } = useSelector(
        (state: RootState) => state.newBot
    );

    const switches = {
        active_buy,
        active_def,
        active_tp,
    };

    const activePair = useSelector(
        (state: RootState) => state.pairs.activePair
    );

    const dispatch: Dispatch<any> = useDispatch();

    const handleContextSwitch = (
        key: "active_buy" | "active_def" | "active_tp",
        state?: boolean
    ) => {
        const newValue = state !== undefined ? state : !switches[key];

        if (key === "active_buy" && !newValue) {
            console.log(state, active_buy);
            dispatch(setField({ field: "active_buy", value: false }));
            dispatch(setField({ field: "active_def", value: false }));
        } else if (key === "active_def" && newValue) {
            dispatch(setField({ field: "active_buy", value: true }));
            dispatch(setField({ field: "active_def", value: true }));
        } else {
            dispatch(setField({ field: key, value: newValue }));
        }
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
        const titleWithoutSpaces = title
            .replace(/^\s+|\s+$/g, "")
            .replace(/\s+/g, " ");
        if (titleWithoutSpaces.length < 3 || titleWithoutSpaces.length > 20) {
            dispatch(addAlert({ title: "Title must be between 3 and 20" }));
            dispatch(setField({ field: "title", value: titleWithoutSpaces }));
            return false;
        }

        if (!(active_buy || active_def || active_tp)) {
            dispatch(
                addAlert({ title: "At least one strategy must be enabled" })
            );
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
                dispatch(deleteAlert());
                console.log(active_buy, active_def, active_tp);
                if (active_buy) navigate("/createbot/step2");
                else if (active_tp) navigate("/createbot/step4");
                else navigate("/createbot/step5");
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
    }, [title, active_buy, active_def, active_tp]);

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
                        placeholder=""
                    />
                </label>
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
