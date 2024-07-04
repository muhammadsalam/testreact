import { useEffect } from "react";
import Header from "./components/Header/Header";

import { blockVerticalScrollApp } from "./lib/utils/blockVerticalScrollApp";

function App() {
    window.Telegram.WebApp.expand();

    useEffect(() => {
        blockVerticalScrollApp(true);
    }, []);

    return (
        <>
            <div className="content">
                something
                <div className="block">block</div>
                <input placeholder="placeholder" inputMode="number" />
            </div>
        </>
    );
}

export default App;
