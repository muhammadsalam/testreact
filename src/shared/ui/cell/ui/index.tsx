import { FlexWrapper, PaddingWrapper } from "shared/ui";
import styles from "./style.module.scss";
import { FC, HTMLAttributes, ReactNode } from "react";

interface CellProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    children?: ReactNode;
    description?: string;
}

export const Cell: FC<CellProps> = ({
    title,
    description,
    children,
    ...props
}) => {
    return (
        <div className={styles.cell} {...props}>
            {Boolean(title) && (
                <PaddingWrapper>
                    <FlexWrapper>
                        <p className={styles.cell_title}>{title}</p>
                    </FlexWrapper>
                </PaddingWrapper>
            )}

            <div className={styles.cell_list}>{children}</div>

            {Boolean(description) && (
                <PaddingWrapper className={styles.cell_description}>
                    {description}
                </PaddingWrapper>
            )}
        </div>
    );
};
