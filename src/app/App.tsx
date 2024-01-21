import { FC, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProfilePage } from "pages/profile";
import { ConfigurePage } from "pages/configure";
import { DefendsPage } from "pages/defends";
import { tgApp } from "shared/lib";
import { StrategyPage } from "pages/strategy";

export const App: FC = () => {
    useEffect(() => {
        tgApp.setHeaderColor("#F2F2F7");
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProfilePage />} />
                <Route path="/configure" element={<ConfigurePage />} />
                <Route path="/strategy" element={<StrategyPage />} />
                <Route path="/defends" element={<DefendsPage />} />
            </Routes>
        </Router>
    );
};
