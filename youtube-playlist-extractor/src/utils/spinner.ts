// src/utils/spinner.ts
import ora from 'ora';

export const createSpinner = (text: string) => {
    return ora({
        text,
        spinner: 'dots'
    }).start();
};