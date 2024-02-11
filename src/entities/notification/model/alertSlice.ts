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

export const addAlert = (notification: notification) => (dispatch: any) => {
    // Отменить старый таймер, если он существует
    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    dispatch({
        type: 'alert/setAlert',
        payload: {
            ...notification,
            isActive: true,
        },
    });

    // Установить новый таймер
    timeoutId = setTimeout(() => {
        dispatch({
            type: 'alert/deleteAlert',
        });
    }, 3000);
};

export const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        deleteAlert: () => {
            return { title: '' };
        },
        setAlert: (state, action: PayloadAction<notification>) => {
            return action.payload;
            state;
        }
    },
})

export const { deleteAlert, setAlert } = alertSlice.actions;

export default alertSlice.reducer;