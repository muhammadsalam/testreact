import { FC, useEffect } from "react";
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

export const App: FC = () => {
    useEffect(() => {
        tgApp.setHeaderColor("#F2F2F7");
        tgApp.expand();
    }, []);

    const dispatch = useDispatch();
    const alert = useSelector((state: RootState) => state.alert);

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchUser());
    }, []);

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
                    <Route path="/bot/:id" element={<BotPage />} />
                    <Route path="/createbot/*" element={<CreateBotPage />} />
                </Routes>
            </Router>
        </>
    );
};
