import { Route, Routes, useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { tgApp } from "shared/lib";
import { BotDetailsLayout, BotMainLayout } from "../layouts";
import { BotData } from "..";

export const BotPage = () => {
    const { id: botID } = useParams();
    const token = useSelector((state: any) => state.user.token);

    const [botData, setBotData] = useState<BotData | null>(null);

    useEffect(() => {
        axios
            .get(
                `https://back.anestheziabot.tra.infope9l.beget.tech/v1/bot_data?bot_id=${botID}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then((res) => {
                return res.data.status === "success" && res.data.data;
            })
            .then((data) => {
                setBotData(data);
                console.log(data);
            })
            .catch((error) => {
                console.log("something went wrong", error);
            });
    }, []);

    useEffect(() => {
        tgApp.BackButton.show();

        const backButtonHandler = () => {
            window.history.back();
        };
        tgApp.BackButton.onClick(backButtonHandler);

        const mainButtonHandler = () => {
            tgApp.BackButton.hide();
            window.history.back();
        };

        tgApp.MainButton.onClick(mainButtonHandler);

        tgApp.MainButton.show();
        tgApp.MainButton.text = "Go to main";
        tgApp.MainButton.color = "#007AFF";

        return () => {
            tgApp.BackButton.hide();
            tgApp.BackButton.offClick(backButtonHandler);
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, []);

    return (
        <div className={styles.container}>
            <Routes>
                <Route path="/" element={<BotMainLayout botData={botData} />} />
                <Route
                    path="details"
                    element={<BotDetailsLayout botData={botData} />}
                />
            </Routes>
        </div>
    );
};
