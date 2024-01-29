import { FC, useEffect } from "react";
import styles from "./style.module.scss";
import { tgApp, useSwitch } from "shared/lib";
import { Cell, CellListItem, FlexWrapper, Switcher } from "shared/ui";
import { useRange } from "shared/ui/range/libs/use-range";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { useBot } from "pages/create-bot/libs";

export const DurationLayout: FC = () => {
    const navigate = useNavigate();

    const {
        bot: { cycles, active_buy, active_def, active_tp },
        setBot,
    } = useBot();

    useEffect(() => {
        const backButtonHandler = () => {
            window.history.back();
        };
        tgApp.BackButton.onClick(backButtonHandler);

        const mainButtonHandler = () => {
            window.location.hash =
                "#" + (3 + +active_buy + +active_def + +active_tp); // тут изменить
            navigate("/"); // тут удалить
        };
        tgApp.MainButton.onClick(mainButtonHandler);

        tgApp.MainButton.text =
            "Next to step " +
            (3 + +active_buy + +active_def + +active_tp) +
            " / " +
            (3 + +active_buy + +active_def + +active_tp);
        tgApp.MainButton.color = "#007AFF";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, [active_buy, active_def, active_tp]);

    const rangeData = useRange(1, 10, cycles);

    useEffect(() => {
        setBot((restBot) => ({ ...restBot, cycles: rangeData.value }));
    }, [rangeData.value]);

    const fullCycleSwitch = useSwitch();
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h1 className={styles.top_title}>Duration</h1>
                <p className={styles.top_subtitle}>
                    Select the type of trading for detailed bot setup
                </p>
            </div>

            <Cell description="Dynamic pricing is adjusting prices based on external elements such as demand, supply, market, and customer behavior.">
                <CellListItem>
                    <p className={styles.switch_title}>Full сycles</p>
                    <Switcher switchData={fullCycleSwitch} />
                </CellListItem>
                <CellListItem
                    className={clsx(styles.wrapper, {
                        [styles.wrapper__active]: fullCycleSwitch.state,
                    })}
                    topBottomPadding={fullCycleSwitch.state ? undefined : 0}
                >
                    <div className={styles.progress}>
                        <FlexWrapper className={styles.progress_top}>
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                            <span>5</span>
                            <span>6</span>
                            <span>7</span>
                            <span>8</span>
                            <span>9</span>
                            <span>10</span>
                        </FlexWrapper>
                        <div className={styles.rangeSlider}>
                            <input
                                ref={rangeData.ref}
                                value={rangeData.value}
                                onChange={({ target: { value: radius } }) =>
                                    rangeData.setValue(+radius)
                                }
                                type="range"
                                min={1}
                                max={10}
                                step={1}
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
                            <div className={styles.rangeSlider_elements}>
                                {[...Array(10)].map((_, index) => {
                                    return (
                                        <span
                                            key={index}
                                            style={{
                                                borderColor: "#f2f2f7",
                                            }}
                                        ></span>
                                    );
                                })}
                            </div>
                            <div
                                style={{
                                    clipPath: `polygon(0 0, ${rangeData.offset}% 0, ${rangeData.offset}% 100%, 0% 100%)`,
                                }}
                                className={styles.rangeSlider_activeElements}
                            >
                                {[...Array(10)].map((_, index) => {
                                    return (
                                        <span
                                            key={index}
                                            style={{
                                                borderColor: "#007AFF",
                                            }}
                                        ></span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </CellListItem>
            </Cell>
        </div>
    );
};
