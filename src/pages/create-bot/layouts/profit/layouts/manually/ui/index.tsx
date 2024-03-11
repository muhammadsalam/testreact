import { FC, useEffect, useState } from "react";
import styles from "./style.module.scss";
import { Cell, CellListItem } from "shared/ui";
import PlusIcon from "../../../../../../../assets/icons/plus.svg?react";
import {
    handleInputFocus,
    handleInputScroll,
    limitFloat,
    tgApp,
} from "shared/lib";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/AppStore";
import { addAlert, deleteAlert } from "entities/notification";
import { setField } from "pages/create-bot";
import { useNavigate } from "react-router-dom";

interface step {
    step: string;
    amount: string;
}

export const ManuallyLayout: FC = () => {
    const { takes } = useSelector((state: RootState) => state.newBot);
    const dispatch: Dispatch<any> = useDispatch();

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
            dispatch(
                addAlert({ title: "Total % amount cannot be greater than 100" })
            );
            return;
        }

        setSteps((restSteps) => [...restSteps, newStep]);
        dispatch(setField({ field: "takes", value: [...takes, newStep] }));
    };

    const handleStepDelete = (index: number) => {
        setSteps((restSteps) =>
            restSteps.filter((_, arrIndex) => arrIndex !== index)
        );
        dispatch(
            setField({
                field: "takes",
                value: takes.filter((_, arrIndex) => arrIndex !== index),
            })
        );
    };

    const handleStepChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        let value = limitFloat(e.target.value, 2);
        if (Number(value) < 0) return;

        if (value.startsWith("0") && value.length > 1) {
            value = value.slice(1);
            e.target.value = value;
        }

        setSteps((restSteps) => {
            const updatedSteps = restSteps.map((step, stepIndex) =>
                stepIndex === index ? { ...step, step: value } : step
            );
            return updatedSteps;
        });

        dispatch(
            setField({
                field: "takes",
                value: [...takes].map((item, arrIndex) =>
                    arrIndex === index ? { ...item, step: value } : { ...item }
                ),
            })
        );
    };

    const handleAmountChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        let value = limitFloat(e.target.value, 2);

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

        if (takes.length > 1) {
            if (totalAmount > 100) {
                dispatch(
                    addAlert({
                        title: `Total % amount cannot be greater than ${
                            100 -
                            takes.reduce(
                                (total, item, elemIndex) =>
                                    total +
                                    (elemIndex === index ? 0 : +item.amount),
                                0
                            )
                        }`,
                    })
                );
                return;
            }
        } else if (totalAmount > 100) {
            dispatch(
                addAlert({ title: "Total % amount cannot be greater than 100" })
            );
            return;
        }

        setSteps((restSteps) => {
            const updatedSteps = restSteps.map((step, stepIndex) => ({
                ...step,
                amount: stepIndex === index ? value : step.amount,
            }));
            return updatedSteps;
        });

        dispatch(
            setField({
                field: "takes",
                value: [...takes].map((item, arrIndex) =>
                    arrIndex === index
                        ? { ...item, amount: value }
                        : { ...item }
                ),
            })
        );
    };

    const validation = () => {
        if (+takes < 0) {
            dispatch(addAlert({ title: "Invalid Takes (should be >0)" }));
            return false;
        }

        for (let i = 0; i < takes.length; i++) {
            if (+takes[i].step < 1 || +takes[i].step > 99) {
                dispatch(
                    addAlert({
                        title: "The value of the “Intermediate take profit” field must be greater than or equal to 1, but not more than 99",
                    })
                );
                return false;
            }

            if (takes.length === 1) {
                if (+takes[i].amount < 1 || +takes[i].amount > 100) {
                    dispatch(
                        addAlert({
                            title: "The value of the “Amount” field must be greater than 1, but not greater than 100",
                        })
                    );
                    return false;
                }
            } else {
                const freeAmount =
                    100 -
                    takes.reduce(
                        (total, item, elemIndex) =>
                            total + (elemIndex !== i ? +item.amount : 0),
                        0
                    );

                if (+takes[i].amount < 1 || +takes[i].amount > freeAmount) {
                    dispatch(
                        addAlert({
                            title: `The value of the “Amount” field in Step ${
                                i + 1
                            } must be greater than 1, but not greater than ${freeAmount}`,
                        })
                    );
                    return false;
                }
            }
        }

        if (takes.reduce((total, take) => total + +take.amount, 0) > 100) {
            dispatch(addAlert({ title: "Total amount should be <= 100%" }));
            return false;
        }

        return true;
    };

    const navigate = useNavigate();

    useEffect(() => {
        const mainButtonHandler = () => {
            if (validation()) {
                dispatch(deleteAlert());
                navigate("/createbot/step5");
            }
        };

        tgApp.MainButton.onClick(mainButtonHandler);

        return () => {
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, [takes]);

    return (
        <>
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
                                    inputMode="decimal"
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
                                    inputMode="decimal"
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
