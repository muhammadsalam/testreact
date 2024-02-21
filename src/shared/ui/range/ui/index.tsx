import clsx from "clsx";
import styles from "./ui.module.scss";
import { FC, HTMLAttributes, useEffect } from "react";
import { FlexWrapper } from "shared/ui";

interface RangeProps extends HTMLAttributes<HTMLDivElement> {
    lineClassName?: string;
    topClassName?: string;
    sliderClassName?: string;
    bubbleClassName?: string;
    inputClassName?: string;
    min: string;
    max: string;
    currValue?: number;
    step?: number;
    handle?: (value: string) => void;
    value: number;
    innerRef: React.RefObject<HTMLInputElement>;
    setValue: React.Dispatch<React.SetStateAction<number>>;
    offset: number;
}

export const Range: FC<RangeProps> = ({
    lineClassName,
    topClassName,
    sliderClassName,
    bubbleClassName,
    inputClassName,
    step = 1,
    min,
    max,
    handle,
    value,
    innerRef,
    setValue,
    offset,
    ...props
}) => {
    useEffect(() => {
        handle && handle(value.toString());
    }, [value]);

    return (
        <div className={styles.wrapper} {...props}>
            <FlexWrapper className={topClassName}>
                <span className={styles.rangeText}>{min}</span>
                <span
                    className={clsx(
                        styles.rangeText,
                        styles.rangeText__current
                    )}
                >
                    {value}
                </span>
                <span className={styles.rangeText}>{max}</span>
            </FlexWrapper>
            <div className={clsx(styles.rangeSlider, [sliderClassName])}>
                <input
                    ref={innerRef}
                    value={value}
                    onChange={({ target: { value: radius } }) =>
                        setValue(+radius)
                    }
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    className={clsx(styles.rangeSlider_input, inputClassName)}
                />
                <div
                    style={{
                        left: offset + "%",
                    }}
                    className={clsx(styles.rangeSlider_bubble, bubbleClassName)}
                ></div>
                <div
                    style={{ width: offset + "%" }}
                    className={clsx(styles.rangeSlider_line, lineClassName)}
                ></div>
            </div>
        </div>
    );
};
