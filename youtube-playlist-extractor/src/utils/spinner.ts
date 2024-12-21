// src/utils/spinner.ts
import ora, { Options } from 'ora';

export const createSpinner = (text: string, options?: Options): ora.Ora => {
    return ora({
        text,
        spinner: 'dots',
        color: 'yellow',
        ...options
    });
};