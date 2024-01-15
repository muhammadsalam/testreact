import { useEffect, useRef, useState } from "react";

export const useRange = (min: number, max: number, currValue: number) => {
    const [value, setValue] = useState<number>(currValue);
    const ref = useRef<HTMLInputElement>(null);
    const [offset, setOffset] = useState<number>(0);

    useEffect(() => {
        const rangeMin = min,
            rangeMax = max,
            rangeRange = rangeMax - rangeMin,
            currentValue = value,
            relativeValue = (currentValue - rangeMin) / rangeRange,
            rangeWidth = (ref.current?.clientWidth || 0) - 12,
            leftOffset = rangeWidth * relativeValue;

        setOffset(leftOffset);
    }, [value]);

    return { ref, value, setValue, offset };
};