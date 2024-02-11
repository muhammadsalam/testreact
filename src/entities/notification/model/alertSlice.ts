import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ReactNode } from 'react';

export type notification = {
    isActive?: boolean;
    title: string;
    icon?: ReactNode;
};

const initialState: notification = {
    isActive: false,
    title: '',
    icon: undefined,
}

let timeoutId: NodeJS.Timeout | null = null;

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        deleteAlert: (state) => {
            if (timeoutId) clearTimeout(timeoutId);

            state.isActive = false;
            state.title = '';
            state.icon = undefined;
        },
        setAlert: (state, action: PayloadAction<notification>) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            state.isActive = true;
            state.title = action.payload.title;
            state.icon = action.payload.icon;

            timeoutId = setTimeout(() => {
                state.isActive = false;
                state.title = '';
                state.icon = undefined;
            }, 3000);
        }
    },
})

export const { deleteAlert, setAlert } = alertSlice.actions;

export default alertSlice.reducer;