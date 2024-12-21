/**
 * validator.ts
 * Input validation utilities for the YouTube playlist extractor.
 * 
 * This module provides:
 * - URL validation
 * - Format validation
 * - Input sanitization
 */

/**
 * Regular expression for validating YouTube playlist URLs
 * Matches patterns like:
 * - https://youtube.com/playlist?list=xyz
 * - https://www.youtube.com/playlist?list=xyz
 */
const PLAYLIST_URL_REGEX = /^https?:\/\/(www\.)?youtube\.com\/playlist\?list=[a-zA-Z0-9_-]+$/;

/**
 * Validates a YouTube playlist URL
 * @param {string} url - URL to validate
 * @returns {Promise<boolean>} True if URL is valid, false otherwise
 * @throws {Error} If URL is invalid
 * 
 * @example
 * try {
 *     await validatePlaylistUrl('https://youtube.com/playlist?list=xyz');
 *     console.log('URL is valid');
 * } catch (error) {
 *     console.error('Invalid URL:', error.message);
 * }
 */
export const validatePlaylistUrl = async (url: string): Promise<boolean> => {
    if (!url) {
        throw new Error('Playlist URL is required');
    }

    if (!PLAYLIST_URL_REGEX.test(url)) {
        throw new Error('Invalid playlist URL format. Expected: https://youtube.com/playlist?list=...');
    }

    return true;
};