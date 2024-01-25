import { createBotContext } from "pages/create-bot";
import { useContext } from "react";

export const useBot = () => {
    const context = useContext(createBotContext);

    if (!context) {
        throw new Error("useBot must be used within a BotProvider");
    }

    return context;
};
