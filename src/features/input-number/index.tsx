import { BotModel } from "pages/create-bot";

export const inputNumber = (
    value: string,
    handler: (value: React.SetStateAction<string>) => void,
    setBot: (value: React.SetStateAction<BotModel>) => void,
    botKey: keyof BotModel
) => {
    if (Number(value) < 0) return;
    if (
        (value.startsWith("-") ||
            value.startsWith("+") ||
            value.startsWith("0")) &&
        value.length > 1
    ) {
        value = value.slice(1);
    }
    handler(value);
    setBot((prevState) => {
        return { ...prevState, [botKey]: Number(value) };
    });
};
