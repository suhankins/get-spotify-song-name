import he from 'he';
import { validateUrl } from './validateUrl';

export async function getSongData(url: string | null) {
    if (!url || !validateUrl(url)) {
        throw new Error('No url provided', { cause: 400 });
    }

    const songUrl = new URL(url);
    songUrl.search = ''; // Deleting any tracking params

    const result = await fetch(songUrl).catch(() => {
        throw new Error('Request failed, try again later', { cause: 500 });
    });

    if (result.status === 404) {
        throw new Error('Song not found', { cause: 404 });
    }

    if (!result.ok) {
        throw new Error(`Request failed with ${result.status} status, try again later`, { cause: 500 });
    }

    const text = await result.text();

    const title = text.match(/(?<=:title" content=")(.*?)(?=")/gm)?.[0];
    const artist = text.match(/(?<=:description" content=")(.*?)(?= · )/gm)?.[0];
    const cover = text.match(/(?<=:image" content=")(.*?)(?=")/gm)?.[0];

    if (!title || !artist || !cover) {
        throw new Error('Invalid URL', { cause: 400 });
    }

    return {
        title: he.decode(title),
        artist: he.decode(artist),
        cover,
    };
}
