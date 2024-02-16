import { FC, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProfilePage } from "pages/profile";
import { tgApp } from "shared/lib";
import { CreateBotPage } from "pages/create-bot";
import { AddKeyPage } from "pages/add-key";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "shared/API/userSlice";
import { BotPage } from "pages/bot";
import { Notification, NotificationWrapper } from "entities/notification";
import { RootState } from "./AppStore";
import { Dispatch } from "@reduxjs/toolkit";
import { Loader } from "widgets/loader";
import FontFaceObserver from "fontfaceobserver";

export const App: FC = () => {
    useEffect(() => {
        tgApp.setHeaderColor("#F2F2F7");
        tgApp.setBackgroundColor("#f2f2f7");
        tgApp.expand();
    }, []);

    const dispatch: Dispatch<any> = useDispatch();
    const alert = useSelector((state: RootState) => state.alert);

    useEffect(() => {
        tgApp.ready();
        dispatch(fetchUser());
    }, []);

    const [isFontsLoading, setIsFontsLoading] = useState({
        SFPro: false,
        SFRounded: false,
        SFProDisplay: false,
    });

    useEffect(() => {
        let SFPro = new FontFaceObserver("SF Pro");
        SFPro.load(null, 140000).then(() => {
            setIsFontsLoading((prev) => ({ ...prev, SFPro: true }));
        });
        let SFRounded = new FontFaceObserver("SFRounded");
        SFRounded.load(null, 140000).then(() => {
            setIsFontsLoading((prev) => ({ ...prev, SFRounded: true }));
        });
        let SFProDisplay = new FontFaceObserver("SFProDisplay");
        SFProDisplay.load(null, 140000).then(() => {
            setIsFontsLoading((prev) => ({ ...prev, SFProDisplay: true }));
        });
    }, []);

    // return <Loader />;
    // // если все шрифты не прогрузились
    if (Object.values(isFontsLoading).some((v) => !v)) {
        return <Loader />;
    }

    return (
        <>
            <NotificationWrapper>
                {alert.isActive && (
                    <Notification title={alert.title} icon={alert.icon} />
                )}
            </NotificationWrapper>
            <Router>
                <Routes>
                    <Route path="/" element={<ProfilePage />} />
                    <Route path="/keyadd/*" element={<AddKeyPage />} />
                    <Route path="/bot/:id/*" element={<BotPage />} />
                    <Route path="/createbot/*" element={<CreateBotPage />} />
                </Routes>
            </Router>
        </>
    );
};
