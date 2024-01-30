import { FC, ReactNode } from "react";
import styles from "./styles.module.scss";
import WarningIcon from "../../../assets/icons/warning.svg?react";
import { FlexWrapper, PaddingWrapper } from "shared/ui";

export const NotificationWrapper: FC<{ children: ReactNode }> = ({
    children,
}) => {
    return <div className={styles.wrapper}>{children}</div>;
};

export const Notification: FC<{ title: string; icon?: ReactNode }> = ({
    title,
    icon = <WarningIcon />,
}) => {
    return (
        <div className={styles.notification}>
            <PaddingWrapper ptb={10}>
                <FlexWrapper>
                    <div className={styles.content}>
                        {icon}
                        {title}
                    </div>
                </FlexWrapper>
            </PaddingWrapper>
        </div>
    );
};
