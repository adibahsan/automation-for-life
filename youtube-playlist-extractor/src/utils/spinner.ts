/**
 * spinner.ts
 * Creates loading spinners for better user experience.
 * 
 * This module provides:
 * - Visual feedback during long operations
 * - Consistent spinner styling
 * - Easy-to-use spinner creation
 */

import ora from 'ora';

/**
 * Creates a new spinner with consistent styling
 * @param {string} text - Text to display next to spinner
 * @returns {ora.Ora} Configured spinner instance
 * 
 * @example
 * const spinner = createSpinner('Loading...');
 * spinner.start();
 * // Do some work
 * spinner.succeed('Done!');
 */
export const createSpinner = (text: string) => {
    return ora({
        text,
        color: 'cyan',
        spinner: 'dots'
    });
};