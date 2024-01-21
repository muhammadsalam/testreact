import { ConfigurePage } from "pages/configure";
import { DefendsPage } from "pages/defends";
import { StrategyPage } from "pages/strategy";
import { useEffect, useState } from "react";

export const CreateBotPage = () => {
    const [hash, setHash] = useState(window.location.hash);

    useEffect(() => {
        const hashChangeHandler = () => {
            setHash(window.location.hash);
        };

        window.addEventListener("hashchange", hashChangeHandler);

        return () => {
            window.removeEventListener("hashchange", hashChangeHandler);
        };
    }, []);

    const renderComponent = () => {
        switch (hash) {
            case "#2":
                return <StrategyPage />;
            case "#3":
                return <DefendsPage />;
            default:
                return <ConfigurePage />;
        }
    };

    return <>{renderComponent()}</>;
};
