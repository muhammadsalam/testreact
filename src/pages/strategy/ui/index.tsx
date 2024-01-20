import { FC, useState } from "react";
import styles from "./style.module.scss";
import { Cell, Dropdown } from "shared/ui";
import clsx from "clsx";

export const StrategyPage: FC = () => {
    const tabs = ["Manually", "By indicator"];
    const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>(
        tabs[0].toLowerCase()
    );

    return (
        <>
            <div className={styles.container}>
                <div className={styles.top}>
                    <p className={styles.top_title}>Strategy</p>
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

                <Cell description="Min 5.03 USDT / 0.00021 BTC">
                    <div className={styles.list_item}>
                        <p className={styles.list_item_title}>Input type</p>
                        <Dropdown
                            items={[
                                "From the first order",
                                "title-1",
                                "title-2",
                            ]}
                        />
                    </div>
                    <div className={styles.list_item}>
                        <p className={styles.list_item_title}>
                            Volume of the first order
                        </p>
                        <span className={styles.list_item_span}>77</span>
                    </div>
                </Cell>

                <Cell>
                    <div className={styles.list_item}>
                        <p className={styles.list_item_title}>
                            Type of the first order
                        </p>
                        <Dropdown
                            items={["Limit order", "title-1", "title-2"]}
                        />
                    </div>
                    <div className={styles.list_item}>
                        <p className={styles.list_item_title}>
                            Price for a limit order
                        </p>
                        <span className={styles.list_item_span}>1000</span>
                    </div>
                </Cell>
            </div>
            <div className={styles.bottom}>
                <button className={styles.btn__primary}>
                    Next to step 3 / 6
                </button>
            </div>
        </>
    );
};
