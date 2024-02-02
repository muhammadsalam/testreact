import { FC, useState } from "react";
import styles from "./style.module.scss";
import { Cell, CellListItem } from "shared/ui";
import PlusIcon from "../../../../../../../assets/icons/plus.svg?react";
import { handleInputFocus, handleInputScroll } from "shared/lib";
import { useBot } from "pages/create-bot/libs";
import { inputNumber } from "features/input-number";

interface step {
    step: string;
    amount: string;
}

export const ManuallyLayout: FC = () => {
    const {
        addAlert,
        bot: { existing_volume, takes, active_buy },
        setBot,
    } = useBot();

    const [steps, setSteps] = useState<step[]>(takes);

    const handleStepAdd = () => {
        const newStep = {
            step: "",
            amount: "",
        };

        const totalAmount = takes.reduce(
            (total, item) => total + +item.amount,
            0
        );

        if (totalAmount >= 100) {
            addAlert({
                title: "Общий % amount уже 100%, куда уж больше",
            });
            return;
        }

        setSteps((restSteps) => [...restSteps, newStep]);
        setBot((restBot) => ({
            ...restBot,
            takes: [...restBot.takes, newStep],
        }));
    };

    const handleStepDelete = (index: number) => {
        setSteps((restSteps) =>
            restSteps.filter((_, arrIndex) => arrIndex !== index)
        );
        setBot((restBot) => {
            const newTakes = restBot.takes.filter(
                (_, arrIndex) => arrIndex !== index
            );
            return {
                ...restBot,
                takes: newTakes,
            };
        });
    };

    const handleStepChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        let value = e.target.value;
        if (Number(value) < 0) return;

        if (value.startsWith("0") && value.length > 1) {
            value = value.slice(1);
            e.target.value = value;
        }

        setSteps((restSteps) => {
            const updatedSteps = [...restSteps];
            updatedSteps[index].step = value;
            return updatedSteps;
        });

        setBot((restBot) => ({
            ...restBot,
            takes: [...restBot.takes].map((item, arrIndex) =>
                arrIndex === index ? { ...item, step: value } : { ...item }
            ),
        }));
    };

    const handleAmountChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        let value = e.target.value;
        if (Number(value) < 0) return;

        if (value.startsWith("0") && value.length > 1) {
            value = value.slice(1);
            e.target.value = value;
        }

        // Проверять валидацию полей шагов в Take Profits сразу при написании. Если написал больше, чем 100%, то не будет появляться символ и выйдет плашка уведомления о том, что нельзя вводить больше 100% общего количества amount
        // Если amount общий равен 100%, то нельзя добавлять больше step
        // Если добавил 90шт, заполнил первые 2 на 100%, то остальные 88шт не будут учитываться.

        const totalAmount = takes.reduce(
            (total, item, elemIndex) =>
                total + (elemIndex === index ? +value : +item.amount),
            0
        );

        if (totalAmount > 100) {
            addAlert({
                title: "Общий % amount не может быть больше 100%",
            });
            return;
        }

        setSteps((restSteps) => {
            const updatedSteps = [...restSteps];
            updatedSteps[index].amount = value;
            return updatedSteps;
        });

        setBot((restBot) => ({
            ...restBot,
            takes: [...restBot.takes].map((item, arrIndex) =>
                arrIndex === index ? { ...item, amount: value } : { ...item }
            ),
        }));
    };

    const [ExistingVolume, setExistingVolume] = useState("" + existing_volume);
    const handleExistingVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        inputNumber(
            e.target.value,
            setExistingVolume,
            setBot,
            "existing_volume"
        );
    };

    return (
        <>
            {!active_buy && (
                <Cell title="Volume">
                    <CellListItem>
                        <p className={styles.listItem_title}>Existing volume</p>
                        <input
                            type="number"
                            className={styles.listItem_input}
                            onFocus={handleInputFocus}
                            onClick={handleInputScroll}
                            value={ExistingVolume}
                            onChange={handleExistingVolume}
                        />
                    </CellListItem>
                </Cell>
            )}

            <Cell title="Remaining by volume">
                <CellListItem>
                    <div className={styles.progressbar}>
                        <span
                            className={styles.progressbar_bar}
                            style={{
                                transition: "width .2s ease-in-out",
                                width:
                                    takes.reduce(
                                        (total, item) => total + +item.amount,
                                        0
                                    ) + "%",
                            }}
                        ></span>
                    </div>
                    <span className={styles.listItem_span}>
                        {takes.reduce((total, item) => total + +item.amount, 0)}
                        %
                    </span>
                </CellListItem>
            </Cell>

            <Cell listClass={false}>
                <div className={styles.lists}>
                    {steps.map((item, index) => (
                        <Cell
                            key={index}
                            title={`Step ${index + 1}`}
                            topContextBtn={
                                Boolean(index) && (
                                    <button
                                        className={styles.step_delete}
                                        onClick={() => handleStepDelete(index)}
                                    >
                                        Delete
                                    </button>
                                )
                            }
                        >
                            <CellListItem>
                                <p className={styles.listItem_title}>
                                    Intermediate Take Profit, %
                                </p>
                                <input
                                    type="number"
                                    className={styles.listItem_input}
                                    onFocus={handleInputFocus}
                                    onClick={handleInputScroll}
                                    value={item.step}
                                    onChange={(e) => handleStepChange(e, index)}
                                />
                            </CellListItem>
                            <CellListItem>
                                <p className={styles.listItem_title}>
                                    Amount, %
                                </p>
                                <input
                                    type="number"
                                    className={styles.listItem_input}
                                    onFocus={handleInputFocus}
                                    onClick={handleInputScroll}
                                    value={item.amount}
                                    onChange={(e) =>
                                        handleAmountChange(e, index)
                                    }
                                />
                            </CellListItem>
                        </Cell>
                    ))}
                    <button
                        className={styles.lists_btn}
                        onClick={handleStepAdd}
                    >
                        <PlusIcon className={styles.lists_btn_icon} />
                        Add a step
                    </button>
                </div>
            </Cell>
        </>
    );
};
