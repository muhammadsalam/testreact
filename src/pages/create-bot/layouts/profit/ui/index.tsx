import { FC, useState, useEffect } from "react";
import styles from "./style.module.scss";
import clsx from "clsx";
import { Cell, FlexWrapper } from "shared/ui";
import ArrowRightIcon from "../../../../../assets/icons/arrow.svg?react";
import PlusIcon from "../../../../../assets/icons/plus.svg?react";
import { tgApp } from "shared/lib";

export const ProfitLayout: FC = () => {
    const tabs = [
        {
            title: "Manually",
            disabled: false,
        },
        {
            title: "Automatic",
            disabled: false,
        },
    ];
    const [activeTab, setActiveTab] = useState<string>(
        tabs[0].title.toLowerCase()
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

    useEffect(() => {
        const backButtonHandler = () => {
            window.location.hash = "#3";
        };
        tgApp.BackButton.onClick(backButtonHandler);

        const mainButtonHandler = () => {
            window.location.hash = "#5";
        };
        tgApp.MainButton.onClick(mainButtonHandler);

        tgApp.MainButton.text = "Next to step 5 / 6";
        tgApp.MainButton.color = "#007AFF";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h1 className={styles.top_title}>Take Profit</h1>
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
                            activeTab === tab.title.toLowerCase() &&
                                styles.tabs_button__active
                        )}
                        onClick={() => setActiveTab(tab.title.toLowerCase())}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>

            <Cell title="Order type">
                <button className={styles.navButton_button}>
                    Limit Order
                    <ArrowRightIcon className={styles.navButton_icon} />
                </button>
            </Cell>

            <Cell title="Volume">
                <FlexWrapper className={styles.blockList_item}>
                    <p className={styles.blockList_item_title}>
                        Existing volume
                    </p>
                    <span className={styles.blockList_item_span}>2000</span>
                </FlexWrapper>
            </Cell>

            <Cell title="Remaining by volume">
                <div className={styles.blockList_item}>
                    <FlexWrapper>
                        <div className={styles.progressbar}>
                            <span
                                className={styles.progressbar_bar}
                                style={{ width: "40%" }}
                            ></span>
                        </div>
                        <span className={styles.blockList_item_span}>40%</span>
                    </FlexWrapper>
                </div>
            </Cell>

            <Cell>
                <div className={styles.lists}>
                    {steps.map((step, index) => (
                        <Cell
                            key={index}
                            title={`Step ${index + 1}`}
                            topContextBtn={
                                Boolean(index) && (
                                    <button
                                        className={styles.step_delete}
                                        onClick={() => handleStepDelete(index)}
                                    >
                                        Delete
                                    </button>
                                )
                            }
                        >
                            {step.map((item, index) => (
                                <div
                                    key={index}
                                    className={styles.blockList_item}
                                >
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
                        </Cell>
                    ))}

                    <button
                        className={styles.lists_btn}
                        onClick={handleStepAdd}
                    >
                        <PlusIcon className={styles.lists_btn_icon} /> Add a
                        step
                    </button>
                </div>
            </Cell>
        </div>
    );
};
