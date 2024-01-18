import { FC } from "react";
import styles from "./style.module.scss";
import { FlexWrapper, PaddingWrapper, Switcher } from "shared/ui";
import ArrowRightIcon from "../../../assets/icons/arrow.svg?react";
import BinanceIcon from "../../../assets/icons/binance.svg?react";
import BtcusdtIcon from "../../../assets/icons/btcusdt.svg?react";
import SolusdcIcon from "../../../assets/icons/solusdc.svg?react";
import TwtusdtIcon from "../../../assets/icons/twtusdt.svg?react";
import ChartIcon from "../../../assets/icons/chart.svg?react";

export const ConfigurePage: FC = () => {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.top}>
                    <p className={styles.top_title}>Basic settings</p>
                    <p className={styles.top_subtitle}>
                        Configure the buy settings for your anesthezia
                    </p>
                </div>

                <div>
                    <PaddingWrapper>
                        <FlexWrapper>
                            <p className={styles.navButton_text}>bot name</p>
                        </FlexWrapper>
                    </PaddingWrapper>
                    <div className={styles.block}>Bot 1</div>
                </div>

                <div className={styles.cell}>
                    <PaddingWrapper>
                        <FlexWrapper>
                            <p className={styles.navButton_text}>bot name</p>
                        </FlexWrapper>
                    </PaddingWrapper>
                    <button className={styles.navButton}>
                        <div className={styles.content}>
                            <BtcusdtIcon />
                            <div className={styles.content_info}>
                                <div className={styles.content_info_title}>
                                    BTC<span>USDT</span>
                                </div>
                            </div>
                        </div>
                        <ArrowRightIcon className={styles.navButton_icon} />
                    </button>

                    <PaddingWrapper className={styles.cell_description}>
                        1 BTC = 26 280.25 ₮
                    </PaddingWrapper>
                </div>

                <div className={styles.cell}>
                    <PaddingWrapper>
                        <FlexWrapper>
                            <p className={styles.navButton_text}>trade</p>
                        </FlexWrapper>
                    </PaddingWrapper>
                    <div className={styles.block}>
                        <ChartIcon />
                        Long
                    </div>
                </div>

                <div className={styles.cell}>
                    <PaddingWrapper>
                        <FlexWrapper>
                            <p className={styles.navButton_text}>
                                additionally
                            </p>
                        </FlexWrapper>
                    </PaddingWrapper>
                    <div className={styles.list}>
                        <div className={styles.list_item}>
                            Strategy
                            <Switcher />
                        </div>
                        <div className={styles.list_item}>
                            Defends
                            <Switcher />
                        </div>
                        <div className={styles.list_item}>
                            Take Profit
                            <Switcher />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <button className={styles.btn__primary}>
                    Next to step 2 / 6
                </button>
            </div>
        </>
    );
};
