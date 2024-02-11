import { BotModel, setField } from "pages/create-bot";
import { Dispatch } from "@reduxjs/toolkit";

type InputNumberType = (
    value: string,
    handler: (value: React.SetStateAction<string>) => void,
    botKey: keyof BotModel,
    dispatch: Dispatch<any>,
    max?: number
) => void;

export const inputNumber: InputNumberType = (
    value,
    handler,
    botKey,
    dispatch
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
    dispatch(setField({ field: botKey, value: Number(value) }));
};
