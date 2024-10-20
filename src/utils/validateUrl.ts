export const pattern = /^(https:\/\/open\.spotify\.com\/(track|album|episode|show)\/|https:\/\/spotify\.link\/).+/gm;

export function validateUrl(url: unknown) {
    return typeof url === 'string' && url.match(pattern) !== null;
}
