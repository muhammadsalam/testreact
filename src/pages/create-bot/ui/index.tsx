import {
    Dispatch,
    SetStateAction,
    createContext,
    useEffect,
    useState,
} from "react";
import { tgApp } from "shared/lib";
import {
    ConfigureLayout,
    DefendsLayout,
    DurationLayout,
    ProfitLayout,
    StrategyLayout,
} from "../layouts";

export interface BotModel {
    user_id: number;
    wallet_id: number;
    title: string;
    pair: string;
    strategy: string;
    active_buy: boolean;
    ammount_first_order: string;
    type_first_order: string;
    price_first_order: string;
    active_def: boolean;
    def_type: "IO" | "SL";
    io_calculate_type: string;
    io_count: string;
    io_step: string;
    io_mrt: string;
    io_step_mrt: string;
    stop_loss: string;
    active_tp: boolean;
    take_type: "MANUAL" | "AUTO";
    take_profit: string;
    take_amount: string;
    take_step: string;
    take_mrt: string;
    existing_volume: string;
    purchase_price: string;
    takes: {
        step: string;
        amount: string;
    }[];
    cycles: number;
}

export interface botContext {
    bot: BotModel;
    setBot: Dispatch<SetStateAction<BotModel>>;
    otherStates: {
        def_mrt: boolean;
        def_step_mrt: boolean;
        take_step: boolean;
        take_mrt: boolean;
        cycles: boolean;
    };
    setOtherStates: Dispatch<
        SetStateAction<{
            def_mrt: boolean;
            def_step_mrt: boolean;
            take_step: boolean;
            take_mrt: boolean;
            cycles: boolean;
        }>
    >;
}

export const createBotContext = createContext<botContext | null>(null);

export const CreateBotPage = () => {
    const [hash, setHash] = useState(window.location.hash);

    useEffect(() => {
        const hashChangeHandler = () => {
            setHash(window.location.hash);
        };

        tgApp.setBackgroundColor("#f2f2f7");

        window.addEventListener("hashchange", hashChangeHandler);

        return () => {
            window.removeEventListener("hashchange", hashChangeHandler);
        };
    }, []);

    const renderComponent = () => {
        switch (hash) {
            case "#1":
                return <ConfigureLayout />;
            case "#2":
                return <StrategyLayout />;
            case "#3":
                return <DefendsLayout />;
            case "#4":
                return <ProfitLayout />;
            case "#5":
                return <DurationLayout />;
            default:
                return <ConfigureLayout />;
        }
    };

    const [newBotData, setNewBotData] = useState<BotModel>({
        user_id: 19,
        wallet_id: 8,
        title: "bot 3",
        pair: "BTCUSDT",
        strategy: "LONG",
        active_buy: false,
        ammount_first_order: "",
        type_first_order: "LIMIT",
        price_first_order: "",
        active_def: false,
        def_type: "IO",
        io_calculate_type: "LO",
        io_count: "",
        io_step: "",
        io_mrt: "1",
        io_step_mrt: "1",
        stop_loss: "",
        active_tp: true,
        take_type: "MANUAL",
        existing_volume: "0.5",
        purchase_price: "",
        take_profit: "",
        take_amount: "",
        take_step: "1",
        take_mrt: "1",
        takes: [
            {
                step: "2",
                amount: "35",
            },
        ],
        cycles: 1,
    });

    const [otherStates, setOtherStates] = useState({
        def_mrt: false,
        def_step_mrt: false,
        take_step: false,
        take_mrt: false,
        cycles: false,
    });

    useEffect(() => {
        if (!otherStates.def_mrt) {
            setNewBotData((prevState) => ({
                ...prevState,
                io_mrt: "1",
            }));
        }
        if (!otherStates.def_step_mrt) {
            setNewBotData((prevState) => ({
                ...prevState,
                io_step_mrt: "1",
            }));
        }
    }, [otherStates]);

    return (
        <createBotContext.Provider
            value={{
                bot: newBotData,
                setBot: setNewBotData,
                otherStates,
                setOtherStates,
            }}
        >
            {renderComponent()}
        </createBotContext.Provider>
    );
};
