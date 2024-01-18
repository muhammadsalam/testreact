import { FC, ReactNode } from "react";

export const PaddingWrapper: FC<{
    ptb?: number;
    plr?: number;
    children: ReactNode;
}> = ({ ptb = 4, plr = 16, children }) => {
    const styles = {
        padding: `${ptb}px ${plr}px`,
    };

    return <div style={styles}>{children}</div>;
};
