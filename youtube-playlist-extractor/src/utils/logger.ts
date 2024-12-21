/**
 * logger.ts
 * Provides colorful console logging functionality.
 * 
 * This module wraps console.log with chalk to provide:
 * - Color-coded log levels
 * - Consistent logging format
 * - Better visual hierarchy in terminal output
 */

import chalk from 'chalk';

/**
 * Logger utility for consistent, color-coded console output
 * @namespace logger
 */
export const logger = {
    /**
     * Log informational message in blue
     * @param {string} message - Message to log
     */
    info: (message: string): void => {
        console.log(chalk.blue('ℹ'), message);
    },

    /**
     * Log success message in green
     * @param {string} message - Message to log
     */
    success: (message: string): void => {
        console.log(chalk.green('✓'), message);
    },

    /**
     * Log error message in red
     * @param {string} message - Message to log
     */
    error: (message: string): void => {
        console.error(chalk.red('✗'), message);
    },

    /**
     * Log warning message in yellow
     * @param {string} message - Message to log
     */
    warn: (message: string): void => {
        console.log(chalk.yellow('⚠'), message);
    }
};
