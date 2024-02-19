import { FC, useEffect } from "react";
import styles from "./style.module.scss";
import { Cell, CellListItem, Dropdown } from "shared/ui";
import { tgApp } from "shared/lib";
import { AutomaticLayout, ManuallyLayout } from "../layouts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/AppStore";
import { setField } from "pages/create-bot";
import { addAlert, deleteAlert } from "entities/notification";
import { Dispatch } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const profitDropdown: {
    title: string;
    disabled?: boolean;
    id: "MANUAL" | "AUTO" | "BY_INDICATOR" | null;
}[] = [
    {
        title: "Manually",
        id: "MANUAL",
    },
    {
        title: "Automatic",
        id: "AUTO",
    },
    {
        title: "By indicator",
        id: "BY_INDICATOR",
        disabled: true,
    },
    {
        title: "None",
        id: null,
    },
];

export const ProfitLayout: FC = () => {
    const navigate = useNavigate();

    const {
        take_type,
        active_buy,
        active_def,
        active_tp,
        existing_volume,
        takes,
        take_profit,
        take_amount,
        take_step,
        take_mrt,
        otherStates,
    } = useSelector((state: RootState) => state.newBot);
    const dispatch: Dispatch<any> = useDispatch();

    const validation = (): boolean => {
        if (!active_buy) {
            if (
                !+existing_volume ||
                +existing_volume < 0 ||
                existing_volume.length === 0
            ) {
                dispatch(
                    addAlert({
                        title: "Invalid Existing Volume (should be >0)",
                    })
                );
                return false;
            }
        }

        if (take_type === "MANUAL") {
            if (+takes < 0) {
                dispatch(addAlert({ title: "Invalid Takes (should be >0)" }));
                return false;
            }

            for (let i = 0; i < takes.length; i++) {
                if (+takes[i].step < 1) {
                    dispatch(
                        addAlert({
                            title:
                                "Invalid intermediate take profit in step" +
                                (i + 1) +
                                " (should be >0)",
                        })
                    );
                    return false;
                }

                if (+takes[i].amount < 1 || +takes[i].amount > 100) {
                    dispatch(
                        addAlert({
                            title:
                                "Invalid amount in step" +
                                (i + 1) +
                                " (should be 0< and >100)",
                        })
                    );
                    return false;
                }
            }

            if (takes.reduce((total, take) => total + +take.amount, 0) > 100) {
                dispatch(addAlert({ title: "Total amount should be <= 100%" }));
                return false;
            }
        }

        if (take_type === "AUTO") {
            if (+take_profit <= 1) {
                dispatch(
                    addAlert({ title: "Invalid take profit (should be >1)" })
                );
                return false;
            }

            if (+take_amount < 1 || +take_amount > 100) {
                dispatch(
                    addAlert({
                        title: "Invalid first take profit quantity (should be 0< and >100)",
                    })
                );
                return false;
            }

            if (otherStates.take_step && (+take_step < 1 || +take_step > 5)) {
                dispatch(
                    addAlert({
                        title: "Invalid step take profit (should be 1< and >5)",
                    })
                );
                return false;
            }

            if (otherStates.take_mrt && (+take_mrt < 1 || +take_mrt > 5)) {
                dispatch(
                    addAlert({
                        title: "Invalid martingale take profit (should be 1< and >5)",
                    })
                );
                return false;
            }
        }

        return true;
    };

    useEffect(() => {
        const backButtonHandler = () => {
            window.history.back();
        };
        tgApp.BackButton.onClick(backButtonHandler);

        const mainButtonHandler = () => {
            if (validation()) {
                dispatch(deleteAlert());
                navigate("/createbot/step5");
            }
        };
        tgApp.MainButton.onClick(mainButtonHandler);

        tgApp.MainButton.text = "Next to step 5 / 6";
        tgApp.MainButton.color = "#007AFF";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, [
        active_buy,
        active_def,
        active_tp,
        take_profit,
        take_amount,
        take_step,
        take_mrt,
        existing_volume,
        takes,
        take_type,
        otherStates.take_mrt,
        otherStates.take_step,
    ]);

    const render = () => {
        switch (take_type) {
            case "MANUAL":
                return <ManuallyLayout />;
            case "AUTO":
                return <AutomaticLayout />;
            default:
                return null;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h1 className={styles.top_title}>Take Profit</h1>
                <p className={styles.top_subtitle}>
                    Select the type of trading for detailed bot setup
                </p>
            </div>

            <Cell description="By enabling a Take Profit, you will not use the existing coins in your wallet">
                <CellListItem>
                    <p className={styles.black_color}>Type of first order</p>
                    <Dropdown
                        onSwitch={(item) =>
                            dispatch(
                                setField({
                                    field: "take_type",
                                    value: item.id,
                                })
                            )
                        }
                        defaultValueIndex={profitDropdown.findIndex(
                            (item) => item.id === take_type
                        )}
                        items={profitDropdown}
                    />
                </CellListItem>
            </Cell>

            {render()}
        </div>
    );
};
