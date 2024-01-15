import { FC, ReactNode } from "react";

export const PaddingWrapper: FC<{ children: ReactNode }> = ({ children }) => {
    const styles = {
        padding: "4px 16px",
    };

    return <div style={styles}>{children}</div>;
};
