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
import { KeysPage } from "pages/keys";

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
        SFProDisplay: false,
        SFProText: false,
        SFProRounded: false,
    });

    useEffect(() => {
        let SFProDisplay = new FontFaceObserver("SF Pro Display");
        SFProDisplay.load(null, 140000).then(() => {
            setIsFontsLoading((prev) => ({ ...prev, SFProDisplay: true }));
        });
        let SFProText = new FontFaceObserver("SF Pro Text");
        SFProText.load(null, 140000).then(() => {
            setIsFontsLoading((prev) => ({ ...prev, SFProText: true }));
        });
        let SFProRounded = new FontFaceObserver("SF Pro Rounded");
        SFProRounded.load(null, 140000).then(() => {
            setIsFontsLoading((prev) => ({ ...prev, SFProRounded: true }));
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
                    <Route path="/keys/*" element={<KeysPage />} />
                    <Route path="/keyadd/*" element={<AddKeyPage />} />
                    <Route path="/bot/:id/*" element={<BotPage />} />
                    <Route path="/createbot/*" element={<CreateBotPage />} />
                </Routes>
            </Router>
        </>
    );
};
