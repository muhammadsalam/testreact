import {
    MouseEvent,
    FC,
    HTMLAttributes,
    useEffect,
    useRef,
    useState,
} from "react";
import styles from "./style.module.scss";
import ArrowIcon from "icons/arrow-bottom.svg?react";
import { useOutsideClick } from "shared/lib";
import { FlexWrapper, PaddingWrapper } from "shared/ui";
import clsx from "clsx";

interface OrderHistoryDropdownProps extends HTMLAttributes<HTMLDivElement> {
    title: string;
    items: string[];
    defaultValueIndex?: number;
}

export const OrderHistoryDropdown: FC<OrderHistoryDropdownProps> = ({
    title,
    defaultValueIndex,
    items,
    ...props
}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isDropdownUp, setIsDropdownUp] = useState(false);
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

    const handleElementClick = (
        index: number,
        event: MouseEvent<HTMLDivElement>
    ) => {
        setActiveELemIndex(index);
        setIsDropdownActive(false);
        // onSwitch && onSwitch(items[index]);
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
        <div className={styles.dropdown} {...props} ref={dropdownRef}>
            <button className={styles.button} onClick={handleDropdownActive}>
                <div className={styles.info}>
                    <span className={styles.info_sub}>{title}</span>
                    <div className={styles.info_title}>
                        {items[activeELemIndex]}
                    </div>
                </div>
                <ArrowIcon className={styles.icon} />
            </button>

            <div
                className={clsx(styles.context, {
                    [styles.context__active]: isDropdownActive,
                    [styles.context__up]: isDropdownUp,
                })}
            >
                <div className={styles.context_wrapper}>
                    {items.map((item, index) => {
                        return (
                            <PaddingWrapper
                                className={styles.context_item_wrapper}
                                key={item}
                                ptb={11}
                                onClick={(event) =>
                                    handleElementClick(index, event)
                                }
                            >
                                <FlexWrapper
                                    className={clsx(styles.context_item, {
                                        [styles.context_item__active]:
                                            index === activeELemIndex,
                                    })}
                                >
                                    {item}
                                    <span>􀆅</span>
                                </FlexWrapper>
                            </PaddingWrapper>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
