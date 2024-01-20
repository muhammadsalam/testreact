import { FC, useState } from "react";
import styles from "./style.module.scss";
import { clsx } from "clsx";
import ArrowRightIcon from "../../../assets/icons/arrow.svg?react";
import PlusSVG from "../../../assets/icons/plus.svg?react";
import { Cell, FlexWrapper, Range, Switcher } from "shared/ui";

export const DefendsPage: FC = () => {
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

            <Cell title="Type of insurance order">
                <button className={styles.navButton_button}>
                    Market Order
                    <ArrowRightIcon className={styles.navButton_icon} />
                </button>
            </Cell>

            <Cell>
                <div className={styles.blockList_item}>
                    <FlexWrapper>
                        <p className={styles.blockList_item_title}>
                            Limit of insurance orders
                        </p>
                        <span className={styles.blockList_item_span}>10</span>
                    </FlexWrapper>
                </div>
                <div className={styles.blockList_item}>
                    <FlexWrapper>
                        <p className={styles.blockList_item_title}>
                            Step of insurance orders, %
                        </p>
                        <span className={styles.blockList_item_span}>2</span>
                    </FlexWrapper>
                </div>
            </Cell>

            <Cell description=" The Martingale system is a system in which the dollar value of trades increases after losses, or position size increases with a smaller portfolio size.">
                <div className={clsx(styles.blockList_item, styles.switch)}>
                    <FlexWrapper>
                        <p className={styles.switch_title}>Martingale</p>
                        <Switcher />
                    </FlexWrapper>
                </div>
                <div className={styles.blockList_item}>
                    <Range min={0.1} max={5} currValue={3.5} />
                </div>
            </Cell>

            <Cell description="The price level of each next order changes according to the specified coefficient">
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
            </Cell>
        </div>
    );
};
