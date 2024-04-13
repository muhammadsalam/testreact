import {
    FC,
    HTMLAttributes,
    MouseEvent,
    useEffect,
    useRef,
    useState,
} from "react";
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
        disabledIsClicked?: boolean;
        disabledIsMarked?: boolean;
        defaultValueIndex?: number;
        items: DropdownItem[];
        onSwitch?: React.Dispatch<React.SetStateAction<any>>;
        className?: string;
        placeholderClassName?: string;
        disabledElementClassName?: string;
        labelRef?: React.RefObject<any>;
    } & HTMLAttributes<HTMLDivElement>
> = ({
    disabledIsClicked = true,
    disabledIsMarked = false,
    defaultValueIndex,
    items,
    onSwitch,
    className,
    placeholderClassName,
    disabledElementClassName,
    labelRef,
    ...props
}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const dropdownPopupRef = useRef<HTMLDivElement>(null);

    const [isDropdownUp, setIsDropdownUp] = useState(false);
    const [isDropdownActive, setIsDropdownActive] = useState(false);
    const handleDropdownActive = () => {
        setIsDropdownActive((state) => !state);
    };

    useOutsideClick(labelRef || dropdownRef, () => {
        setIsDropdownActive(false);
    });

    const [activeELemIndex, setActiveELemIndex] = useState<number>(
        defaultValueIndex || 0
    );
    const handleElementClick = (
        index: number,
        event: MouseEvent<HTMLDivElement>
    ) => {
        if (!disabledIsClicked && items[index].disabled) return;
        setActiveELemIndex(index);
        setIsDropdownActive(false);
        onSwitch && onSwitch(items[index]);
        event.preventDefault();
    };

    useEffect(() => {
        const checkDropdownPosition = () => {
            if (dropdownRef.current) {
                const dropdownRect =
                    dropdownRef.current.getBoundingClientRect();

                const tgViewportHeight = getComputedStyle(
                    document.documentElement
                ).getPropertyValue("--tg-viewport-height");
                const viewportHeight =
                    tgViewportHeight && tgViewportHeight !== "100vh"
                        ? parseInt(tgViewportHeight, 10)
                        : window.innerHeight;

                const spaceBelow = viewportHeight - dropdownRect.bottom;

                // Проверяем, есть ли снизу 180 пикселей
                const isEnoughSpaceBelow = spaceBelow >= 180;

                setIsDropdownUp(!isEnoughSpaceBelow);
            }
        };

        // Проверяем положение при активации дропдауна
        if (isDropdownActive) {
            checkDropdownPosition();
        }

        window.addEventListener("resize", checkDropdownPosition);

        return () => {
            window.removeEventListener("resize", checkDropdownPosition);
        };
    }, [isDropdownActive]);

    return (
        <div
            className={clsx(styles.dropdown, [className])}
            ref={dropdownRef}
            {...props}
        >
            <button
                type="button"
                className={styles.dropdown_select}
                onClick={handleDropdownActive}
            >
                <span className={placeholderClassName}>
                    {items[activeELemIndex].title}
                </span>
                <ArrowBottomIcon />
            </button>

            <div
                ref={dropdownPopupRef}
                className={clsx(styles.dropdown_list, {
                    [styles.dropdown_list__active]: isDropdownActive,
                    [styles.dropdown_list__up]: isDropdownUp,
                })}
            >
                <div className={styles.dropdown_list_wrapper}>
                    {items.map((item, index) => {
                        return (
                            <PaddingWrapper
                                className={styles.dropdown_list_item_wrapper}
                                key={item.title}
                                ptb={11}
                                onClick={(event) =>
                                    handleElementClick(index, event)
                                }
                            >
                                <FlexWrapper
                                    className={clsx(
                                        styles.dropdown_list_item,
                                        {
                                            [styles.dropdown_list_item__disabled]:
                                                item.disabled &&
                                                !disabledIsMarked,
                                            [styles.dropdown_list_item__disabled_color]:
                                                item.disabled &&
                                                disabledIsMarked,
                                        },
                                        disabledElementClassName
                                    )}
                                >
                                    {item.title}
                                    {disabledIsMarked && item.disabled && (
                                        <span className={styles.mark}>
                                            Soon
                                        </span>
                                    )}
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
