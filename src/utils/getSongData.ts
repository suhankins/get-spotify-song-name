import he from 'he';
import { validateUrl } from './validateUrl';
import { getCoverColor } from './getCoverColor';

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

    const title = text.match(/(?<=og:title" content=")(.*?)(?=")/gm)?.[0];
    const artist =
        text.match(/(?<=music:musician_description" content=")(.*?)(?=")/gm)?.[0] ||
        text.match(/(?<= - Album by )(.*?)(?= | Spotify<\/title>)/gm)?.[0] ||
        text.match(/(?<=og:description" content=")(.*?)(?= · Episode")/gm)?.[0];
    const cover = text.match(/(?<=:image" content=")(.*?)(?=")/gm)?.[0];

    if (!title) {
        throw new Error('No title', { cause: 400 });
    } else if (!artist) {
        throw new Error('No artist', { cause: 400 });
    } else if (!cover) {
        throw new Error('No cover', { cause: 400 });
    }

    const color = await getCoverColor(cover);

    return {
        title: he.decode(title),
        artist: he.decode(artist),
        cover,
        color,
    };
}
