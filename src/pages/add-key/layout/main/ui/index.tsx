import { Cell } from "shared/ui";
import ArrowRightIcon from "../../../../../assets/icons/arrow.svg?react";
import styles from "./styles.module.scss";
import { handleInputFocus, handleInputScroll, tgApp } from "shared/lib";
import { FC, ReactNode, useEffect, useState } from "react";
import BinanceIcon from "assets/icons/binance.svg?react";
import { Link, useNavigate } from "react-router-dom";

export const MainLayout: FC<{
    addAlert: ({
        title,
        icon,
        ms,
    }: {
        title: string;
        icon?: ReactNode;
        ms?: number;
    }) => void;
    activeExchange: string;
    handleDeleteAlert: () => void;
}> = ({ activeExchange, addAlert, handleDeleteAlert }) => {
    const [apikey, setApikey] = useState("");
    const handleApikeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setApikey(e.target.value);
    };

    const [secretKey, setSecretKey] = useState("");
    const handleSecretKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSecretKey(e.target.value);
    };

    const navigate = useNavigate();

    const validation = () => {
        if (apikey === "" || secretKey === "") {
            addAlert({ title: "To add a key, fill in all fields" });
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
                handleDeleteAlert();
                tgApp.BackButton.hide();
                navigate("/");
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
                <Link to="/keyadd/select-exchange" className={styles.navButton}>
                    <div className={styles.content}>
                        <BinanceIcon />
                        <div className={styles.content_info}>
                            <div className={styles.content_info_title}>
                                {activeExchange}
                            </div>
                        </div>
                    </div>
                    <ArrowRightIcon className={styles.navButton_icon} />
                </Link>
            </Cell>

            <Cell title="api key">
                <label className={styles.input_label}>
                    <input
                        type="number"
                        inputMode="numeric"
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
                        type="number"
                        inputMode="numeric"
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
};
