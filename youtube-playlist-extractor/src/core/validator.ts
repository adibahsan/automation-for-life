// src/core/validators.ts
export const validatePlaylistUrl = (url: string): boolean => {
    const playlistPattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/playlist\?list=[\w-]+$/;
    return playlistPattern.test(url);
};