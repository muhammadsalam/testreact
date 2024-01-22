import { FC, useRef, useState } from "react";
import styles from "./style.module.scss";
import { useOutsideClick } from "shared/lib";
import ArrowBottomIcon from "../../../../assets/icons/arrow-bottom.svg?react";
import { FlexWrapper, PaddingWrapper } from "shared/ui";

export const Dropdown: FC<{ items: string[] }> = ({ items, ...props }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const handleDropdownActive = () => {
        setIsDropdownActive((state) => !state);
    };

    useOutsideClick(dropdownRef, () => {
        setIsDropdownActive(false);
    });

    const [activeELemIndex, setActiveELemIndex] = useState<number>(0);
    const handleElementClick = (index: number) => {
        setActiveELemIndex(index);
        setIsDropdownActive(false);
    };

    return (
        <div className={styles.dropdown} ref={dropdownRef} {...props}>
            <div
                className={styles.dropdown_select}
                onClick={handleDropdownActive}
            >
                {items[activeELemIndex]}
                <ArrowBottomIcon
                    style={{
                        transition: "rotate .123s ease-in",
                        rotate: isDropdownActive ? "180deg" : "0deg",
                    }}
                />
            </div>
            {isDropdownActive && (
                <div className={styles.dropdown_list}>
                    {items.map((item, index) => {
                        return (
                            <PaddingWrapper
                                ptb={11}
                                onClick={() => handleElementClick(index)}
                            >
                                <FlexWrapper
                                    className={styles.dropdown_list_item}
                                >
                                    {item}
                                    {items[activeELemIndex] === item && (
                                        <span>􀆅</span>
                                    )}
                                </FlexWrapper>
                            </PaddingWrapper>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
