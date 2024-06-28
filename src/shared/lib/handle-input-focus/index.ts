import { FocusEvent } from "react";

export const handleInputFocus = ({ target }: FocusEvent<HTMLInputElement>) => {
    const T = target.type;
    target.type = "text";
    target.selectionStart = target.selectionEnd = 10000;
    target.type = T;
}