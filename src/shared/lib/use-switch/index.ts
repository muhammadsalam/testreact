import { useState } from "react";

type useSwitchType = (currentState?: boolean, currentHandle?: () => void) => ({ state: boolean; handle: () => void });

export const useSwitch: useSwitchType = (currentState = false) => {
    const [state, setState] = useState<boolean>(currentState);

    const handle: () => void = () => {
        setState(!state);
    };

    return { state, handle };
};
