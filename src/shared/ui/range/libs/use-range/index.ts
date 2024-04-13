import { useLayoutEffect, useRef, useState } from "react";

export const useRange = (min: number, max: number, currvalue: number) => {
    const [value, setValue] = useState<number>(currvalue);
    const innerRef = useRef<HTMLInputElement>(null);
    const [offset, setOffset] = useState<number>(0);

    useLayoutEffect(() => {
        const
            currentValue = value,
            relativeValue = (currentValue - min) / (max - min),
            leftOffset = relativeValue * 100;

        setOffset(leftOffset);
    }, [value]);

    return { innerRef, value, setValue, offset };
};
