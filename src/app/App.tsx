import { FC, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProfilePage } from "pages/profile";
import { tgApp } from "shared/lib";
import { CreateBotPage } from "pages/create-bot";
import { Loader } from "widgets/loader";
import FontFaceObserver from "fontfaceobserver";

export const App: FC = () => {
    useEffect(() => {
        tgApp.setHeaderColor("#F2F2F7");
        tgApp.expand();
    }, []);

    const [isFontsLoading, setIsFontsLoading] = useState({
        "SF Pro": false,
        SFRounded: false,
        SFProDisplay: false,
    });
    let SFPro = new FontFaceObserver("SF Pro");
    SFPro.load().then(() => {
        setIsFontsLoading((prev) => ({ ...prev, "SF Pro": true }));
    });
    let SFRounded = new FontFaceObserver("SFRounded");
    SFRounded.load().then(() => {
        setIsFontsLoading((prev) => ({ ...prev, SFRounded: true }));
    });
    let SFProDisplay = new FontFaceObserver("SFProDisplay");
    SFProDisplay.load().then(() => {
        setIsFontsLoading((prev) => ({ ...prev, SFProDisplay: true }));
    });

    // если все шрифты не прогрузились
    if (Object.values(isFontsLoading).some((v) => !v)) {
        return <Loader />;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<ProfilePage />} />
                <Route path="/createbot" element={<CreateBotPage />} />
            </Routes>
        </Router>
    );
};
