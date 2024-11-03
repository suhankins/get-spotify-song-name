import type { APIRoute } from 'astro';
import { getSongData } from '../utils/getSongData';

export const GET: APIRoute = async ({ url }) => {
    try {
        const urlString = url.searchParams.get('url');
        if (!urlString) {
            throw new Error('No url string', { cause: 400 });
        }
        const songsUrls = decodeURIComponent(urlString).split(' ');

        const songs = await Promise.all(songsUrls.map((url) => getSongData(url)));
        return new Response(JSON.stringify(songs));
    } catch (error) {
        if (!(error instanceof Error)) {
            return new Response('Unknown error', { status: 500 });
        }
        const message = error.message;
        if (typeof error.cause !== 'string') {
            return new Response(message, { status: 500 });
        }
        const code = parseInt(error.cause);
        if (isNaN(code)) {
            return new Response(message, { status: 500 });
        }
        return new Response(message, { status: code });
    }
};
