import { FC, useEffect, useRef, useState } from "react";
import styles from "./App.module.scss";
import { clsx } from "clsx";
import ArrowRightIcon from "../assets/icons/arrow.svg?react";
import PlusSVG from "../assets/icons/plus.svg?react";

export const App: FC = () => {
    const tabs = ["Insurance orders", "Stop Loss"];
    const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>(
        tabs[0].toLowerCase()
    );

    const Switcher = (): { state: boolean; handle: () => void } => {
        const [state, setState] = useState<boolean>(false);

        const handle: () => void = () => {
            setState(!state);
        };

        // const SwitchJSX = () => (
        //     <div
        //         onClick={handleSwitchClick}
        //         className={clsx(
        //             styles.switcher,
        //             isSwitchActive && styles.switcher__active
        //         )}
        //     >
        //         <span className={styles.switcher_slick}></span>
        //     </div>
        // );

        return { state, handle };
    };

    const MartingaleSwitch = Switcher();

    const RangeSlider = (min: number, max: number, currValue: number) => {
        const [value, setValue] = useState<number>(currValue);
        const ref = useRef<HTMLInputElement>(null);
        const [leftOffset, setLeftOffset] = useState<number>(0);

        useEffect(() => {
            const rangeMin = min,
                rangeMax = max,
                rangeRange = rangeMax - rangeMin,
                currentValue = value,
                relativeValue = (currentValue - rangeMin) / rangeRange,
                rangeWidth = (ref.current?.clientWidth || 0) - 12,
                leftOffset = rangeWidth * relativeValue;

            setLeftOffset(leftOffset);
        }, [value]);

        return { ref, value, setValue, leftOffset };
    };

    const rangeMartingale = RangeSlider(0.1, 5, 3.5);

    const dynamicSwitch = Switcher();
    const dynamicRange = RangeSlider(1, 5, 2);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h1 className={styles.top_title}>Defends</h1>
                <p className={styles.top_subtitle}>
                    Select the type of trading for detailed bot setup
                </p>
            </div>

            <div className={styles.tabs}>
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={clsx(
                            styles.tabs_button,
                            activeTab === tab.toLowerCase() &&
                                styles.tabs_button__active
                        )}
                        onClick={() => setActiveTab(tab.toLowerCase())}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className={styles.navButton}>
                <div className={clsx(styles.paddingBlock, styles.wrapper_flex)}>
                    <p className={styles.navButton_text}>
                        Type of insurance order
                    </p>
                </div>
                <button className={styles.navButton_button}>
                    Market Order
                    <ArrowRightIcon className={styles.navButton_icon} />
                </button>
            </div>

            <div className={styles.blockList}>
                <div className={styles.blockList_content}>
                    <div className={styles.blockList_item}>
                        <div className={styles.wrapper_flex}>
                            <p className={styles.blockList_item_title}>
                                Limit of insurance orders
                            </p>
                            <span className={styles.blockList_item_span}>
                                10
                            </span>
                        </div>
                    </div>
                    <div className={styles.blockList_item}>
                        <div className={styles.wrapper_flex}>
                            <p className={styles.blockList_item_title}>
                                Step of insurance orders, %
                            </p>
                            <span className={styles.blockList_item_span}>
                                2
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.blockList}>
                <div className={styles.blockList_content}>
                    <div className={clsx(styles.blockList_item, styles.switch)}>
                        <div className={styles.wrapper_flex}>
                            <p className={styles.switch_title}>Martingale</p>
                            <div
                                onClick={MartingaleSwitch.handle}
                                className={clsx(
                                    styles.switcher,
                                    MartingaleSwitch.state &&
                                        styles.switcher__active
                                )}
                            >
                                <span className={styles.switcher_slick}></span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.blockList_item}>
                        <div className={styles.wrapper_flex}>
                            <span className={styles.rangeText}>0.1</span>
                            <span
                                className={clsx(
                                    styles.rangeText,
                                    styles.rangeText__current
                                )}
                            >
                                {rangeMartingale.value}
                            </span>
                            <span className={styles.rangeText}>5</span>
                        </div>
                        <div className={styles.rangeSlider}>
                            <input
                                ref={rangeMartingale.ref}
                                value={rangeMartingale.value}
                                onChange={({ target: { value: radius } }) =>
                                    rangeMartingale.setValue(+radius)
                                }
                                type="range"
                                min={0.1}
                                max={5}
                                step={0.1}
                                className={styles.rangeSlider_input}
                            />
                            <div
                                style={{
                                    left: rangeMartingale.leftOffset,
                                }}
                                className={styles.rangeSlider_bubble}
                            ></div>
                            <div
                                style={{ width: rangeMartingale.leftOffset }}
                                className={styles.rangeSlider_line}
                            ></div>
                        </div>
                    </div>
                </div>
                <p className={styles.blockList_description}>
                    The Martingale system is a system in which the dollar value
                    of trades increases after losses, or position size increases
                    with a smaller portfolio size.
                </p>
            </div>

            <div className={styles.blockList}>
                <div className={styles.blockList_content}>
                    <div className={clsx(styles.blockList_item, styles.switch)}>
                        <div className={styles.wrapper_flex}>
                            <p className={styles.switch_title}>
                                Dynamic price step CO
                            </p>
                            <div
                                onClick={dynamicSwitch.handle}
                                className={clsx(
                                    styles.switcher,
                                    dynamicSwitch.state &&
                                        styles.switcher__active
                                )}
                            >
                                <span className={styles.switcher_slick}></span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.blockList_item}>
                        <div className={styles.wrapper_flex}>
                            <span className={styles.rangeText}>1.0</span>
                            <span
                                className={clsx(
                                    styles.rangeText,
                                    styles.rangeText__current
                                )}
                            >
                                {dynamicRange.value}
                            </span>
                            <span className={styles.rangeText}>5</span>
                        </div>
                        <div className={styles.rangeSlider}>
                            <input
                                ref={dynamicRange.ref}
                                value={dynamicRange.value}
                                onChange={({ target: { value: radius } }) =>
                                    dynamicRange.setValue(+radius)
                                }
                                type="range"
                                min={1.0}
                                max={5}
                                step={0.1}
                                className={styles.rangeSlider_input}
                            />
                            <div
                                style={{
                                    left: dynamicRange.leftOffset,
                                }}
                                className={styles.rangeSlider_bubble}
                            ></div>
                            <div
                                style={{ width: dynamicRange.leftOffset }}
                                className={styles.rangeSlider_line}
                            ></div>
                        </div>
                    </div>
                </div>
                <p className={styles.blockList_description}>
                    The price level of each next order changes according to the
                    specified coefficient
                </p>
            </div>

            <div className={styles.navButton}>
                <div className={clsx(styles.paddingBlock, styles.wrapper_flex)}>
                    <p className={styles.navButton_text}>Order type</p>
                </div>
                <button className={styles.navButton_button}>
                    Limit Order
                    <ArrowRightIcon className={styles.navButton_icon} />
                </button>
            </div>

            <div className={styles.blockList}>
                <div className={clsx(styles.paddingBlock, styles.wrapper_flex)}>
                    <p className={styles.navButton_text}>Remaining by volume</p>
                </div>
                <div className={styles.blockList_content}>
                    <div className={styles.blockList_item}>
                        <div className={styles.wrapper_flex}>
                            <div className={styles.progressbar}>
                                <span
                                    className={styles.progressbar_bar}
                                    style={{ width: "40%" }}
                                ></span>
                            </div>
                            <span className={styles.blockList_item_span}>
                                40%
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.lists}>
                <div className={styles.blockList}>
                    <div
                        className={clsx(
                            styles.paddingBlock,
                            styles.wrapper_flex
                        )}
                    >
                        <p className={styles.navButton_text}>Step 1</p>
                    </div>
                    <div className={styles.blockList_content}>
                        <div className={styles.blockList_item}>
                            <div className={styles.wrapper_flex}>
                                <p className={styles.blockList_item_title}>
                                    Intermediate Take Profit, %
                                </p>
                                <span className={styles.blockList_item_span}>
                                    1
                                </span>
                            </div>
                        </div>
                        <div className={styles.blockList_item}>
                            <div className={styles.wrapper_flex}>
                                <p className={styles.blockList_item_title}>
                                    Amount, %
                                </p>
                                <span className={styles.blockList_item_span}>
                                    20
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.blockList}>
                    <div
                        className={clsx(
                            styles.paddingBlock,
                            styles.wrapper_flex
                        )}
                    >
                        <p className={styles.navButton_text}>Step 2</p>
                        <button className={styles.step_delete}>Delete</button>
                    </div>
                    <div className={styles.blockList_content}>
                        <div className={styles.blockList_item}>
                            <div className={styles.wrapper_flex}>
                                <p className={styles.blockList_item_title}>
                                    Intermediate Take Profit, %
                                </p>
                                <span className={styles.blockList_item_span}>
                                    1
                                </span>
                            </div>
                        </div>
                        <div className={styles.blockList_item}>
                            <div className={styles.wrapper_flex}>
                                <p className={styles.blockList_item_title}>
                                    Amount, %
                                </p>
                                <span className={styles.blockList_item_span}>
                                    20
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <button className={styles.lists_btn}>
                    <PlusSVG className={styles.lists_btn_icon} /> Add a step
                </button>
            </div>
        </div>
    );
};
