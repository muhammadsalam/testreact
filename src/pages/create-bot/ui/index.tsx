import { useEffect, useState } from "react";
import { ConfigureLayout } from "../layouts/configure";
import { StrategyLayout } from "../layouts/strategy";
import { DefendsLayout } from "../layouts/defends";

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
                return <StrategyLayout />;
            case "#3":
                return <DefendsLayout />;
            default:
                return <ConfigureLayout />;
        }
    };

    return <>{renderComponent()}</>;
};
