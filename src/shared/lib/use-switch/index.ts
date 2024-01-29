import { useState } from "react";

type useSwitchType = (currentState?: boolean, contextSwitching?: () => void) => ({ state: boolean; handle: (tempState?: boolean) => void });

export const useSwitch: useSwitchType = (currentState = false, contextSwitching) => {
    const [state, setState] = useState<boolean>(currentState);

    const handle: (tempState?: boolean) => void = (tempState) => {
        setState(tempState !== undefined ? tempState : !state);
        contextSwitching && contextSwitching();
    };

    return { state, handle };
};
