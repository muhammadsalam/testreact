import { FC, useEffect, useRef } from "react";
import styles from "./style.module.scss";
import { Cell, CellListItem, Dropdown } from "shared/ui";
import { tgApp } from "shared/lib";
import { AutomaticLayout, IndicatorLayout, ManuallyLayout } from "../layouts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/AppStore";
import { BotModel, setField } from "pages/create-bot";
import { Dispatch } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

const profitDropdown: {
    title: string;
    disabled?: boolean;
    id: BotModel["take_type"];
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
    },
    {
        title: "None",
        id: "NONE",
    },
];

const NoneProfitDropdown = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const mainButtonHandler = () => {
            navigate("/createbot/step5");
        };

        tgApp.MainButton.onClick(mainButtonHandler);

        return () => {
            tgApp.MainButton.offClick(mainButtonHandler);
        };
    }, []);

    return null;
};

export const ProfitLayout: FC = () => {
    const {
        take_type,
        entry_type,
        existing_volume,
        takes,
        take_profit,
        take_amount,
        take_step,
        take_mrt,
        otherStates,
    } = useSelector((state: RootState) => state.newBot);
    const dispatch: Dispatch<any> = useDispatch();

    useEffect(() => {
        const backButtonHandler = () => {
            window.history.back();
        };
        tgApp.BackButton.onClick(backButtonHandler);

        tgApp.MainButton.show();
        tgApp.MainButton.text = "Next to step 5 / 6";

        return () => {
            tgApp.BackButton.offClick(backButtonHandler);
        };
    }, [
        entry_type,
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

    const firstOrderTypeRef = useRef(null);

    const render = () => {
        switch (take_type) {
            case "MANUAL":
                return <ManuallyLayout />;
            case "AUTO":
                return <AutomaticLayout />;
            case "BY_INDICATOR":
                return <IndicatorLayout />;
            case "NONE":
                return <NoneProfitDropdown />;
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
                <CellListItem ref={firstOrderTypeRef}>
                    <p className={styles.black_color}>Type of first order</p>
                    <Dropdown
                        labelRef={firstOrderTypeRef}
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
