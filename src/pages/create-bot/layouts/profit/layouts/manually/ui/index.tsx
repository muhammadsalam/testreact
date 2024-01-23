import { FC, useState } from "react";
import styles from "./style.module.scss";
import { Cell, CellListItem } from "shared/ui";
import PlusIcon from "../../../../../../../assets/icons/plus.svg?react";

export const ManuallyLayout: FC = () => {
    interface step {
        title: string;
        span: string;
    }

    const [steps, setSteps] = useState<step[][]>([
        [
            {
                title: "Intermediate Take Profit, %",
                span: "1",
            },
            {
                title: "Amount, %",
                span: "20",
            },
        ],
    ]);

    const handleStepAdd = () => {
        setSteps((restSteps) => [
            ...restSteps,
            [
                { title: "Intermediate Take Profit, %", span: "1" },
                { title: "Amount, %", span: "20" },
            ],
        ]);
    };

    const handleStepDelete = (index: number) => {
        setSteps((restSteps) =>
            [...restSteps].filter((_, arrIndex) => index !== arrIndex)
        );
    };

    return (
        <>
            <Cell title="Volume">
                <CellListItem>
                    <p className={styles.blockList_item_title}>
                        Existing volume
                    </p>
                    <span className={styles.blockList_item_span}>2000</span>
                </CellListItem>
            </Cell>

            <Cell title="Remaining by volume">
                <CellListItem>
                    <div className={styles.progressbar}>
                        <span
                            className={styles.progressbar_bar}
                            style={{ width: "40%" }}
                        ></span>
                    </div>
                    <span className={styles.blockList_item_span}>40%</span>
                </CellListItem>
            </Cell>

            <Cell listClass={false}>
                <div className={styles.lists}>
                    {steps.map((step, index) => (
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
                            {step.map((item, index) => (
                                <CellListItem key={index}>
                                    <p className={styles.blockList_item_title}>
                                        {item.title}
                                    </p>
                                    <span
                                        className={styles.blockList_item_span}
                                    >
                                        {item.span}
                                    </span>
                                </CellListItem>
                            ))}
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
