import { FC, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProfilePage } from "pages/profile";
import { tgApp } from "shared/lib";
import { CreateBotPage } from "pages/create-bot";
import { AddKeyPage } from "pages/add-key";

export const App: FC = () => {
    useEffect(() => {
        tgApp.setHeaderColor("#F2F2F7");
        tgApp.expand();
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProfilePage />} />
                <Route path="/keyadd/*" element={<AddKeyPage />} />
                <Route path="/createbot" element={<CreateBotPage />} />
            </Routes>
        </Router>
    );
};
