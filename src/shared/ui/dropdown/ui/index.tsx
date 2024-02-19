import { FC, HTMLAttributes, useRef, useState } from "react";
import styles from "./style.module.scss";
import { useOutsideClick } from "shared/lib";
import ArrowBottomIcon from "assets/icons/arrow-bottom.svg?react";
import { FlexWrapper, PaddingWrapper } from "shared/ui";
import clsx from "clsx";

type DropdownItem = {
    title: string;
    id: string | null;
    disabled?: boolean;
};

export const Dropdown: FC<
    {
        defaultValueIndex?: number;
        items: DropdownItem[];
        onSwitch?: React.Dispatch<React.SetStateAction<any>>;
        className?: string;
        placeholderClassName?: string;
        disabledElementClassName?: string;
    } & HTMLAttributes<HTMLDivElement>
> = ({
    defaultValueIndex,
    items,
    onSwitch,
    className,
    placeholderClassName,
    disabledElementClassName,
    ...props
}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const handleDropdownActive = () => {
        setIsDropdownActive((state) => !state);
    };

    useOutsideClick(dropdownRef, () => {
        setIsDropdownActive(false);
    });

    const [activeELemIndex, setActiveELemIndex] = useState<number>(
        defaultValueIndex || 0
    );
    const handleElementClick = (index: number) => {
        setActiveELemIndex(index);
        setIsDropdownActive(false);
        onSwitch && onSwitch(items[index]);
    };

    return (
        <div
            className={clsx(styles.dropdown, [className])}
            ref={dropdownRef}
            {...props}
        >
            <div
                className={styles.dropdown_select}
                onClick={handleDropdownActive}
            >
                <span className={placeholderClassName}>
                    {items[activeELemIndex].title}
                </span>
                <ArrowBottomIcon
                    style={{
                        transition: "rotate .123s ease-in",
                        rotate: isDropdownActive ? "90deg" : "0deg",
                    }}
                />
            </div>

            <div
                className={clsx(styles.dropdown_list, {
                    [styles.dropdown_list__active]: isDropdownActive,
                })}
            >
                <div className={styles.dropdown_list_wrapper}>
                    {items.map((item, index) => {
                        return (
                            <PaddingWrapper
                                className={styles.dropdown_list_item_wrapper}
                                key={item.title}
                                ptb={11}
                                onClick={() => handleElementClick(index)}
                            >
                                <FlexWrapper
                                    className={clsx(
                                        styles.dropdown_list_item,
                                        {
                                            [styles.dropdown_list_item__disabled]:
                                                item.disabled,
                                        },
                                        disabledElementClassName
                                    )}
                                >
                                    {item.title}
                                    {items[activeELemIndex].title ===
                                        item.title && <span>􀆅</span>}
                                </FlexWrapper>
                            </PaddingWrapper>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
