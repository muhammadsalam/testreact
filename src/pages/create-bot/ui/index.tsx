import { useEffect, useState } from "react";
import { ConfigureLayout } from "../layouts/configure";
import { StrategyLayout } from "../layouts/strategy";
import { DefendsLayout } from "../layouts/defends";
import { ProfitLayout } from "../layouts/profit";
import { DurationLayout } from "../layouts/duration";

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
            case "#1":
                return <ConfigureLayout />;
            case "#2":
                return <StrategyLayout />;
            case "#3":
                return <DefendsLayout />;
            case "#4":
                return <ProfitLayout />;
            case "#5":
                return <DurationLayout />;
            default:
                return <ConfigureLayout />;
        }
    };

    return <>{renderComponent()}</>;
};
