import { Route, Routes, useLocation, useParams } from "react-router-dom";
import styles from "./styles.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { blockVerticalScrollApp, tgApp } from "shared/lib";
import { BotDetailsLayout, BotMainLayout } from "../layouts";
import { BotData } from "..";
import { API_URL } from "shared/CONSTANT";
import { Loader } from "widgets/loader";

export const BotPage = () => {
    const { id: botID } = useParams();
    const token = useSelector((state: any) => state.user.token);

    const [botData, setBotData] = useState<BotData | null>(null);

    const [isLoading, setIsLoading] = useState(true);

    const location = useLocation();
    useEffect(() => {
        blockVerticalScrollApp(true);
    }, [location]);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`${API_URL}v1/bot_data?bot_id=${botID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                return res.data.status === "success" && res.data.data;
            })
            .then((data) => {
                setBotData(data);
                console.log(data);
            })
            .catch((error) => {
                console.log("something went wrong", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        tgApp.BackButton.show();

        const backButtonHandler = () => {
            window.history.back();
        };
        tgApp.BackButton.onClick(backButtonHandler);

        return () => {
            tgApp.BackButton.hide();
            tgApp.BackButton.offClick(backButtonHandler);
        };
    }, []);

    if (isLoading) return <Loader />;

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
