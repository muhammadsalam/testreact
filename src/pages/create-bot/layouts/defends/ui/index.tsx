import { FC, useEffect } from "react";
import styles from "./style.module.scss";
import { tgApp } from "shared/lib";
import { InsuranceOrdersLayout, StopLossLayout } from "../layouts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/AppStore";
import { Dispatch } from "@reduxjs/toolkit";
import { setField } from "pages/create-bot";
import { addAlert, deleteAlert } from "entities/notification";
import { useNavigate } from "react-router-dom";
import { Cell, CellListItem, Dropdown } from "shared/ui";

const defendsDropdown = [
    {
        title: "Insurance orders",
        id: "IO",
    },
    {
        title: "Stop Loss",
        id: "SL",
    },
    {
        title: "None",
        id: "NONE",
    },
];

export const DefendsLayout: FC = () => {
    const navigate = useNavigate();

    const {
        def_type,
        entry_type,
        active_def,
        active_tp,
        io_count,
        io_step,
        io_mrt,
        io_step_mrt,
        stop_loss,
        otherStates: { def_mrt, def_step_mrt },
    } = useSelector((state: RootState) => state.newBot);
    const dispatch: Dispatch<any> = useDispatch();

    const validation = (): boolean => {
        if (def_type.id === "IO") {
            if (+io_count < 1 || +io_count > 10) {
                dispatch(
                    addAlert({
                        title: "limit of insurance orders should be between 1 and 10",
                    })
                );
                return false;
            }
            if (+io_step < 1 || +io_step > 99) {
                dispatch(
                    addAlert({
                        title: "step of insurance orders should be between 1 and 99",
                    })
                );
                return false;
            }
            if (def_mrt && (+io_mrt < 0.5 || +io_mrt > 5)) {
                dispatch(
                    addAlert({
                        title: "martingale of insurance orders should be between 1 and 5",
                    })
                );
                return false;
            }
            if (def_step_mrt && (+io_step_mrt < 0.5 || +io_step_mrt > 5)) {
                dispatch(
                    addAlert({
                        title: "dynamic price of insurance orders should be between 1 and 5",
                    })
                );
                return false;
            }
        }

        if (def_type.id === "SL") {
            if (+stop_loss < 1 || +stop_loss > 99) {
                dispatch(
                    addAlert({ title: "stop loss should be between 1 and 99" })
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
                if (active_tp) navigate("/createbot/step4");
                else navigate("/createbot/step5");
            }
        };
        tgApp.MainButton.onClick(mainButtonHandler);

        tgApp.MainButton.text = "Next to step 4 / 6";
        tgApp.MainButton.color = "#007AFF";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, [
        entry_type,
        active_def,
        active_tp,
        io_step,
        io_mrt,
        io_step_mrt,
        def_mrt,
        def_step_mrt,
        io_count,
        stop_loss,
        def_type,
    ]);

    const render = () => {
        switch (def_type.id) {
            case "IO":
                return <InsuranceOrdersLayout />;
            case "SL":
                return <StopLossLayout />;
            default:
                return null;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <h1 className={styles.top_title}>Defends</h1>
                <p className={styles.top_subtitle}>
                    Select Insurance orders or Stop loss for detailed bot setup
                </p>
            </div>

            <Cell description="By enabling a defends, you will not use the existing coins in your wallet">
                <CellListItem>
                    <p className={styles.black_color}>Defends</p>
                    <Dropdown
                        onSwitch={(item) =>
                            dispatch(
                                setField({
                                    field: "def_type",
                                    value: item,
                                })
                            )
                        }
                        defaultValueIndex={defendsDropdown.findIndex(
                            (item) => item.id === def_type.id
                        )}
                        items={defendsDropdown}
                    />
                </CellListItem>
            </Cell>

            {render()}
        </div>
    );
};
