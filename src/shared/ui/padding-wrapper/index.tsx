import { FC, HTMLAttributes, ReactNode } from "react";

type PaddingWrapperProps = HTMLAttributes<HTMLDivElement> & {
    ptb?: number;
    plr?: number;
    children: ReactNode;
};

export const PaddingWrapper: FC<PaddingWrapperProps> = ({
    ptb = 4,
    plr = 16,
    children,
    ...props
}) => {
    const styles = {
        padding: `${ptb}px ${plr}px`,
    };

    return (
        <div style={styles} {...props}>
            {children}
        </div>
    );
};
