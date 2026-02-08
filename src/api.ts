
const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL;

if (!rawApiBaseUrl) {
    throw new Error('VITE_API_BASE_URL is not set');
}

const API_BASE_URL = rawApiBaseUrl.startsWith('http://') || rawApiBaseUrl.startsWith('https://')
    ? rawApiBaseUrl
    : `https://${rawApiBaseUrl}`;

const API_BASE_URL_CLEAN = API_BASE_URL.replace(/\/$/, '');

interface ShortenResponse {
    short_code: string;
}

export const shortenUrl = async (longUrl: string): Promise<string> => {
    const response = await fetch(`${API_BASE_URL_CLEAN}/shorten`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ long_url: longUrl }),
    });

    if (!response.ok) {
        if (response.status === 400) {
            throw new Error('Invalid URL provided');
        }
        throw new Error('Failed to shorten URL');
    }

    const data: ShortenResponse = await response.json();
    return data.short_code;
};
