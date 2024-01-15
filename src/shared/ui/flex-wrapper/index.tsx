import { FC, ReactNode } from "react";

export const FlexWrapper: FC<{ children: ReactNode }> = ({ children }) => {
    const styles = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    };

    return <div style={styles}>{children}</div>;
};
