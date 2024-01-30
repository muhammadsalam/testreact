import { BotModel } from "pages/create-bot";

type InputNumberType = (
    value: string,
    handler: (value: React.SetStateAction<string>) => void,
    setBot: (value: React.SetStateAction<BotModel>) => void,
    botKey: keyof BotModel,
    max?: number
) => void;

export const inputNumber: InputNumberType = (
    value,
    handler,
    setBot,
    botKey
) => {
    // if (Number(value) < 0) return;
    // if (
    //     (value.startsWith("-") ||
    //         value.startsWith("+") ||
    //         value.startsWith("0")) &&
    //     value.length > 1
    // ) {
    //     if (!(value.startsWith("0,") || value.startsWith("0."))) {
    //         value = value.slice(1);
    //     }
    // }
    // value.replace(",", ".");

    // if (value === "") value = "0";

    handler(value);
    setBot((prevState) => {
        return { ...prevState, [botKey]: Number(value) };
    });
};
