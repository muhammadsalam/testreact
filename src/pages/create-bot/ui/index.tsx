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
    ammount_first_order: number;
    type_first_order: string;
    price_first_order: number;
    active_def: boolean;
    def_type: "IO" | "SL";
    io_calculate_type: string;
    io_count: number;
    io_step: number;
    io_mrt: number;
    io_step_mrt: number;
    stop_loss: number;
    active_tp: boolean;
    take_type: "MANUAL" | "AUTO";
    take_profit: number;
    take_amount: number;
    take_step: number;
    take_mrt: number;
    existing_volume: number;
    purchase_price: number;
    takes: {
        step: number;
        amount: number;
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
        ammount_first_order: 0,
        type_first_order: "LIMIT",
        price_first_order: 0,
        active_def: false,
        def_type: "IO",
        io_calculate_type: "LO",
        io_count: 0,
        io_step: 0,
        io_mrt: 1,
        io_step_mrt: 1,
        stop_loss: 0,
        active_tp: true,
        take_type: "MANUAL",
        existing_volume: 0.5,
        purchase_price: 0,
        take_profit: 0,
        take_amount: 0,
        take_step: 1,
        take_mrt: 1,
        takes: [
            {
                step: 2,
                amount: 35,
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
                io_mrt: 1,
            }));
        }
        if (!otherStates.def_step_mrt) {
            setNewBotData((prevState) => ({
                ...prevState,
                io_step_mrt: 1,
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
