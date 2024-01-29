import { useLayoutEffect, useRef, useState } from "react";

export const useRange = (min: number, max: number, currValue: number) => {
    const [value, setValue] = useState<number>(currValue);
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
