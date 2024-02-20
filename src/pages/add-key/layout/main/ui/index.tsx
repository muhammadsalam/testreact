import { Cell } from "shared/ui";
import ArrowRightIcon from "../../../../../assets/icons/arrow.svg?react";
import styles from "./styles.module.scss";
import { handleInputFocus, handleInputScroll, tgApp } from "shared/lib";
import { FC, memo, useEffect, useState } from "react";
import BinanceIcon from "assets/icons/binance.svg?react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addAlert, deleteAlert } from "entities/notification";
import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "app/AppStore";
import { WalletType, addWallet } from "shared/API/userSlice";

export const MainLayout: FC<{ activeExchange: string }> = memo(
    ({ activeExchange }) => {
        const user = useSelector((state: RootState) => state.user);
        const dispatch: Dispatch<any> = useDispatch();

        const [apikey, setApikey] = useState("");
        const handleApikeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setApikey(e.target.value);
        };

        const [secretKey, setSecretKey] = useState("");
        const handleSecretKeyChange = (
            e: React.ChangeEvent<HTMLInputElement>
        ) => {
            setSecretKey(e.target.value);
        };

        const navigate = useNavigate();

        const validation = () => {
            if (apikey === "" || secretKey === "") {
                dispatch(
                    addAlert({ title: "To add a key, fill in all fields" })
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

            tgApp.MainButton.show();
            tgApp.MainButton.text = "Add";
            tgApp.MainButton.color = "#007AFF";

            return () => {
                tgApp.BackButton.offClick(backButtonHandler);
            };
        }, []);

        useEffect(() => {
            const mainButtonHandler = () => {
                if (validation()) {
                    dispatch(deleteAlert());
                    const data = {
                        api_key: apikey,
                        api_secret: secretKey,
                        exchange: activeExchange.toUpperCase(),
                    };

                    const config = {
                        headers: {
                            Authorization: "Bearer " + user.token,
                        },
                    };

                    axios
                        .post(
                            "https://back.anestheziabot.tra.infope9l.beget.tech/v1/save_keys",
                            data,
                            config
                        )
                        .then((res) => res.data)
                        .then(
                            (data: { status: string; wallet: WalletType }) => {
                                if (data.status === "success") {
                                    dispatch(addWallet(data.wallet));
                                    tgApp.BackButton.hide();
                                    navigate("/");
                                }
                            }
                        )
                        .catch((error) => {
                            dispatch(
                                addAlert({
                                    title: error.response.data.detail[0].msg,
                                })
                            );
                        });
                }
            };

            tgApp.MainButton.onClick(mainButtonHandler);

            return () => {
                tgApp.MainButton.offClick(mainButtonHandler);
            };
        }, [apikey, secretKey]);

        return (
            <>
                <div className={styles.top}>
                    <p className={styles.top_title}>API key</p>
                    <p className={styles.top_subtitle}>
                        Configure the buy settings for your anesthezia
                    </p>
                </div>

                <Cell title="exchange">
                    <Link
                        to="/keyadd/select-exchange"
                        className={styles.navButton}
                    >
                        {activeExchange !== "" ? (
                            <div className={styles.content}>
                                <BinanceIcon />
                                <div className={styles.content_info}>
                                    <div className={styles.content_info_title}>
                                        {activeExchange}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <span className={styles.placeholder_color}>
                                Select an exchange
                            </span>
                        )}
                        <ArrowRightIcon className={styles.navButton_icon} />
                    </Link>
                </Cell>

                <Cell title="api key">
                    <label className={styles.input_label}>
                        <input
                            type="text"
                            className={styles.input}
                            onFocus={handleInputFocus}
                            onClick={handleInputScroll}
                            value={apikey}
                            onChange={handleApikeyChange}
                            placeholder="API key"
                        />
                    </label>
                </Cell>

                <Cell title="Secret key">
                    <label className={styles.input_label}>
                        <input
                            type="text"
                            className={styles.input}
                            onFocus={handleInputFocus}
                            onClick={handleInputScroll}
                            value={secretKey}
                            onChange={handleSecretKeyChange}
                            placeholder="Secret key"
                        />
                    </label>
                </Cell>
            </>
        );
    }
);
