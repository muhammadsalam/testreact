import { FC, HTMLAttributes, ReactNode } from "react";

type FlexWrapperProps = HTMLAttributes<HTMLDivElement> & {
    children: ReactNode;
};

export const FlexWrapper: FC<FlexWrapperProps> = ({ children, ...props }) => {
    const styles = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    };

    return (
        <div style={styles} {...props}>
            {children}
        </div>
    );
};
