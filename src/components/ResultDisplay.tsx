import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ResultDisplayProps {
    shortCode: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ shortCode }) => {
    const [copied, setCopied] = useState(false);

    // Construct full URL (assuming current host if config is missing, or backend URL)
    // Ideally, the backend returns the full URL, or we construct it.
    // The backend returns just the short code per my analysis.
    // So we need to know the base URL for redirection.
    // If the backend handles redirection at /api/{code}, we might route it there.
    // However, usually a shortener has a short base URL.
    // For now, let's assume the API base URL is also the redirect base URL for simplicity,
    // or use window.location.origin if it's served from the same place.
    // Given the setup (Frontend on Vercel, Backend on Railway), the "Result" 
    // needs to point to the BACKEND's redirect endpoint.

    const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    // The API base should be an absolute URL (with protocol).
    // Redirect is assumed at `API_BASE_URL/{code}`.

    if (!rawApiBaseUrl) {
        return (
            <div className="w-full max-w-lg mt-8">
                <div className="comic-box p-6 bg-[var(--color-nude-dark)] text-center">
                    <p className="font-body text-sm text-[var(--color-maroon)]">
                        Missing VITE_API_BASE_URL configuration.
                    </p>
                </div>
            </div>
        );
    }

    const apiBase = rawApiBaseUrl.startsWith('http://') || rawApiBaseUrl.startsWith('https://')
        ? rawApiBaseUrl
        : `https://${rawApiBaseUrl}`;

    const apiBaseClean = apiBase.replace(/\/$/, '');

    const shortUrl = `${apiBaseClean}/${shortCode}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    return (
        <div className="w-full max-w-lg mt-8">
            <div className="comic-box p-6 bg-[var(--color-nude-dark)] flex flex-col items-center gap-4 text-center transform rotate-1">
                <h3 className="text-2xl font-heading text-[var(--color-maroon)]">
                    BOOM! HERE IT IS:
                </h3>

                <div className="bg-white border-[3px] border-black p-3 w-full break-all font-body font-bold text-lg shadow-[2px_2px_0px_0px_black]">
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {shortUrl}
                    </a>
                </div>

                <button
                    onClick={handleCopy}
                    className="comic-button bg-white text-black hover:bg-gray-100 flex items-center gap-2 text-sm py-2"
                >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'COPIED!' : 'COPY LINK'}
                </button>
            </div>
        </div>
    );
};
