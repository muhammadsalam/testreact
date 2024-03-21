import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import StarSVG from "assets/icons/stars.svg?react";

export const GreetingPage = () => {
    return (
        <div className={styles.container}>
            <strong className={styles.title}>Welcome to Anesthezia!</strong>
            <div className={styles.list}>
                <div className={styles.item}>
                    <StarSVG />
                    <div className={styles.item_content}>
                        <strong>
                            Anesthezia is an unique platform for automated
                            cryptocurrency trading
                        </strong>
                        <p>
                            Explore automated cryptocurrency trading with the
                            Anesthezia ecosystem
                        </p>
                    </div>
                </div>
                <div className={styles.item}>
                    <StarSVG />
                    <div className={styles.item_content}>
                        <strong>
                            Create your own automated trading system
                        </strong>
                        <p>
                            Our platform gives you the ability to form your own
                            bots using advanced algorithmic trading tools
                        </p>
                    </div>
                </div>
                <div className={styles.item}>
                    <StarSVG />
                    <div className={styles.item_content}>
                        <strong>About us</strong>
                        <p>
                            For in-depth details and features, visit {}
                            <a href="https://anesthezia.io" target="_blank">
                                Anesthezia.io
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            <Link to="/tariff" className={styles.button}>
                Start
            </Link>
            <p className={styles.clickwrap}>
                By clicking start, you accept the <a href="">Terms of Use</a> {}
                and <a href="">User Agreement</a>
            </p>
        </div>
    );
};
