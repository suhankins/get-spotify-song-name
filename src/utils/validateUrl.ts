export function validateUrl(url: unknown) {
    return (
        typeof url === 'string' &&
        (url.startsWith('https://open.spotify.com/track/') ||
            url.startsWith('https://spotify.link/'))
    );
}
