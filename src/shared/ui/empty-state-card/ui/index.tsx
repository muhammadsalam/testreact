import { FC, HTMLAttributes } from "react";
import styles from "./style.module.scss";

interface props extends HTMLAttributes<HTMLDivElement> {
    title: string;
    body: string;
}

export const EmptyStateCard: FC<props> = ({ title, body, ...props }) => {
    return (
        <div className={styles.wrapper} {...props}>
            <strong className={styles.title}>{title}</strong>
            <p className={styles.body}>{body}</p>
        </div>
    );
};
