import clsx from "clsx";
import styles from "./ui.module.scss";
import { useRange } from "../libs/use-range";
import { FC } from "react";
import { FlexWrapper } from "shared/ui";

interface RangeProps {
    min: number;
    max: number;
    currValue?: number;
}

export const Range: FC<RangeProps> = ({ min, max, currValue = 2 }) => {
    const rangeData = useRange(min, max, currValue);

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
                    step={0.1}
                    className={styles.rangeSlider_input}
                />
                <div
                    style={{
                        left: rangeData.offset,
                    }}
                    className={styles.rangeSlider_bubble}
                ></div>
                <div
                    style={{ width: rangeData.offset }}
                    className={styles.rangeSlider_line}
                ></div>
            </div>
        </div>
    );
};
