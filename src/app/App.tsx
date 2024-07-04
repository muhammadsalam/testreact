import { FC, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProfilePage } from "pages/profile";
import { blockVerticalScrollApp, tgApp } from "shared/lib";
import { CreateBotPage } from "pages/create-bot";
import { AddKeyPage } from "pages/add-key";
import { BotPage } from "pages/bot";
import { KeysPage } from "pages/keys";

export const App: FC = () => {
    tgApp.expand();

    useEffect(() => {
        blockVerticalScrollApp(true);

        tgApp.ready();
        tgApp.setHeaderColor("#F2F2F7");
        tgApp.setBackgroundColor("#f2f2f7");
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProfilePage />} />
                <Route path="/keys/*" element={<KeysPage />} />
                <Route path="/keyadd/*" element={<AddKeyPage />} />
                <Route path="/bot/:id/*" element={<BotPage />} />
                <Route path="/createbot/*" element={<CreateBotPage />} />
            </Routes>
        </Router>
    );
};
