import {
    FC,
    ReactNode,
    HTMLAttributes,
    forwardRef,
    Ref,
    MutableRefObject,
} from "react";
import styles from "./style.module.scss";
import { FlexWrapper, PaddingWrapper } from "shared/ui";
import clsx from "clsx";

interface CellListItemProps extends HTMLAttributes<HTMLElement> {
    isLabel?: boolean;
    children: ReactNode;
    topBottomPadding?: number;
    leftRightPadding?: number;
    color?: string;
    ref?: MutableRefObject<any>;
}

export const CellListItem: FC<CellListItemProps> = forwardRef(
    (
        {
            isLabel = true,
            children,
            topBottomPadding = 13,
            leftRightPadding = 16,
            className,
            color = "#8e8e93",
            ...props
        }: CellListItemProps,
        ref: Ref<any>
    ) => {
        const Tag = isLabel ? "label" : "div";

        return (
            <Tag
                className={clsx(styles.wrapper, className)}
                style={{ color }}
                ref={ref}
                {...props}
            >
                <PaddingWrapper
                    className={styles.inner}
                    ptb={topBottomPadding}
                    plr={leftRightPadding}
                >
                    <FlexWrapper>{children}</FlexWrapper>
                </PaddingWrapper>
            </Tag>
        );
    }
) as FC<CellListItemProps>;
