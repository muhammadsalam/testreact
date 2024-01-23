import { FlexWrapper, PaddingWrapper } from "shared/ui";
import styles from "./style.module.scss";
import { FC, HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface CellProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    children?: ReactNode;
    description?: string;
    topContextBtn?: ReactNode;
    listClass?: boolean;
}

export const Cell: FC<CellProps> = ({
    title,
    topContextBtn,
    description,
    children,
    listClass = true,
    ...props
}) => {
    return (
        <div className={styles.cell} {...props}>
            {(Boolean(title) || Boolean(topContextBtn)) && (
                <PaddingWrapper>
                    <FlexWrapper>
                        <p className={styles.cell_title}>{title}</p>
                        {topContextBtn}
                    </FlexWrapper>
                </PaddingWrapper>
            )}

            <div className={clsx({ [styles.cell_list]: listClass })}>
                {children}
            </div>

            {Boolean(description) && (
                <PaddingWrapper className={styles.cell_description}>
                    {description}
                </PaddingWrapper>
            )}
        </div>
    );
};
