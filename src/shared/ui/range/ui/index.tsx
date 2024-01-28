import clsx from "clsx";
import styles from "./ui.module.scss";
import { useRange } from "../libs/use-range";
import { FC, useEffect } from "react";
import { FlexWrapper } from "shared/ui";

interface RangeProps {
    min: string;
    max: string;
    currValue?: number;
    step?: number;
    handle?: (value: number) => void;
}

export const Range: FC<RangeProps> = ({
    step = 1,
    min,
    max,
    currValue = 2,
    handle,
}) => {
    const rangeData = useRange(+min, +max, currValue);

    useEffect(() => {
        handle && handle(rangeData.value);
    }, [rangeData.value]);

    return (
        <div className={styles.wrapper}>
            <FlexWrapper>
                <span className={styles.rangeText}>{min}</span>
                <span
                    className={clsx(
                        styles.rangeText,
                        styles.rangeText__current
                    )}
                >
                    {rangeData.value}
                </span>
                <span className={styles.rangeText}>{max}</span>
            </FlexWrapper>
            <div className={styles.rangeSlider}>
                <input
                    ref={rangeData.ref}
                    value={rangeData.value}
                    onChange={({ target: { value: radius } }) =>
                        rangeData.setValue(+radius)
                    }
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    className={styles.rangeSlider_input}
                />
                <div
                    style={{
                        left: rangeData.offset + "%",
                    }}
                    className={styles.rangeSlider_bubble}
                ></div>
                <div
                    style={{ width: rangeData.offset + "%" }}
                    className={styles.rangeSlider_line}
                ></div>
            </div>
        </div>
    );
};
