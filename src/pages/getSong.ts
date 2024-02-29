import type { APIRoute } from 'astro';
import { getSongData } from '../utils/getSongData';

export const GET: APIRoute = async ({ url }) => {
    const urlString = url.searchParams.get('url');

    try {
        const song = await getSongData(urlString);
        return new Response(JSON.stringify(song));
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
