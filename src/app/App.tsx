import { FC } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProfilePage } from "pages/profile";
import { ConfigurePage } from "pages/configure";

export const App: FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProfilePage />} />
                <Route path="/configure" element={<ConfigurePage />} />
            </Routes>
        </Router>
    );
};
