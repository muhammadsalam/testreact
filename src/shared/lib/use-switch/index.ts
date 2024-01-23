import { useState } from "react";

export const useSwitch = (): { state: boolean; handle: () => void } => {
    const [state, setState] = useState<boolean>(false);

    const handle: () => void = () => {
        setState(!state);
    };

    return { state, handle };
};
