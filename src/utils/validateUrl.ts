export function validateUrl(url: string) {
    return (
        url.startsWith('https://open.spotify.com/track/') ||
        url.startsWith('https://spotify.link/')
    );
}
