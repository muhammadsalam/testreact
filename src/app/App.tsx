import { FC, useState } from "react";
import styles from "./App.module.scss";
import { clsx } from "clsx";
import ArrowRightIcon from "../assets/icons/arrow.svg?react";
import PlusSVG from "../assets/icons/plus.svg?react";
import { FlexWrapper, Range, Switcher } from "shared/ui";
import { PaddingWrapper } from "shared/ui/padding-wrapper";

export const App: FC = () => {
    const tabs = ["Insurance orders", "Stop Loss"];
    const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>(
        tabs[0].toLowerCase()
    );

    interface step {
        title: string;
        span: string;
    }

    const [steps, setSteps] = useState<step[][]>([
        [
            {
                title: "Intermediate Take Profit, %",
                span: "1",
            },
            {
                title: "Amount, %",
                span: "20",
            },
        ],
    ]);

    const handleStepAdd = () => {
        setSteps((restSteps) => [
            ...restSteps,
            [
                { title: "Intermediate Take Profit, %", span: "1" },
                { title: "Amount, %", span: "20" },
            ],
        ]);
    };

    const handleStepDelete = (index: number) => {
        setSteps((restSteps) =>
            [...restSteps].filter((_, arrIndex) => index !== arrIndex)
        );
    };

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
                <PaddingWrapper>
                    <FlexWrapper>
                        <p className={styles.navButton_text}>
                            Type of insurance order
                        </p>
                    </FlexWrapper>
                </PaddingWrapper>
                <button className={styles.navButton_button}>
                    Market Order
                    <ArrowRightIcon className={styles.navButton_icon} />
                </button>
            </div>

            <div className={styles.blockList}>
                <div className={styles.blockList_content}>
                    <div className={styles.blockList_item}>
                        <FlexWrapper>
                            <p className={styles.blockList_item_title}>
                                Limit of insurance orders
                            </p>
                            <span className={styles.blockList_item_span}>
                                10
                            </span>
                        </FlexWrapper>
                    </div>
                    <div className={styles.blockList_item}>
                        <FlexWrapper>
                            <p className={styles.blockList_item_title}>
                                Step of insurance orders, %
                            </p>
                            <span className={styles.blockList_item_span}>
                                2
                            </span>
                        </FlexWrapper>
                    </div>
                </div>
            </div>

            <div className={styles.blockList}>
                <div className={styles.blockList_content}>
                    <div className={clsx(styles.blockList_item, styles.switch)}>
                        <FlexWrapper>
                            <p className={styles.switch_title}>Martingale</p>
                            <Switcher />
                        </FlexWrapper>
                    </div>
                    <div className={styles.blockList_item}>
                        <Range min={0.1} max={5} currValue={3.5} />
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
                        <FlexWrapper>
                            <p className={styles.switch_title}>
                                Dynamic price step CO
                            </p>
                            <Switcher />
                        </FlexWrapper>
                    </div>
                    <div className={styles.blockList_item}>
                        <Range min={1.0} max={5} currValue={2} />
                    </div>
                </div>
                <p className={styles.blockList_description}>
                    The price level of each next order changes according to the
                    specified coefficient
                </p>
            </div>

            <div className={styles.navButton}>
                <PaddingWrapper>
                    <FlexWrapper>
                        <p className={styles.navButton_text}>Order type</p>
                    </FlexWrapper>
                </PaddingWrapper>
                <button className={styles.navButton_button}>
                    Limit Order
                    <ArrowRightIcon className={styles.navButton_icon} />
                </button>
            </div>

            <div className={styles.blockList}>
                <PaddingWrapper>
                    <FlexWrapper>
                        <p className={styles.navButton_text}>
                            Remaining by volume
                        </p>
                    </FlexWrapper>
                </PaddingWrapper>
                <div className={styles.blockList_content}>
                    <div className={styles.blockList_item}>
                        <FlexWrapper>
                            <div className={styles.progressbar}>
                                <span
                                    className={styles.progressbar_bar}
                                    style={{ width: "40%" }}
                                ></span>
                            </div>
                            <span className={styles.blockList_item_span}>
                                40%
                            </span>
                        </FlexWrapper>
                    </div>
                </div>
            </div>

            <div className={styles.lists}>
                {steps.map((step, index) => (
                    <div className={styles.blockList}>
                        <PaddingWrapper>
                            <FlexWrapper>
                                <p className={styles.navButton_text}>
                                    Step {index + 1}
                                </p>
                                {index !== 0 && (
                                    <button
                                        className={styles.step_delete}
                                        onClick={() => handleStepDelete(index)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </FlexWrapper>
                        </PaddingWrapper>
                        <div className={styles.blockList_content}>
                            {step.map((item) => (
                                <div className={styles.blockList_item}>
                                    <FlexWrapper>
                                        <p
                                            className={
                                                styles.blockList_item_title
                                            }
                                        >
                                            {item.title}
                                        </p>
                                        <span
                                            className={
                                                styles.blockList_item_span
                                            }
                                        >
                                            {item.span}
                                        </span>
                                    </FlexWrapper>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <button className={styles.lists_btn} onClick={handleStepAdd}>
                    <PlusSVG className={styles.lists_btn_icon} /> Add a step
                </button>
            </div>
        </div>
    );
};
