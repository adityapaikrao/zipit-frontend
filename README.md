# ZIP IT! Frontend

ZIP IT! is a comic-styled URL shortener frontend built with React, TypeScript, and Vite. It lets users paste a long URL, calls the backend `/shorten` endpoint, and displays a short link with a one-click copy button.

## Features

- Shorten long URLs through a simple form.
- Auto-prepends `https://` if the protocol is missing.
- Displays the short URL and lets users copy it to the clipboard.
- Friendly error states for invalid URLs or failed requests.

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS (custom comic-style theme)
- lucide-react icons

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Set the backend API base URL (must include `/api`):

```
VITE_API_BASE_URL=http://localhost:8080/api
```

Run the dev server:

```bash
npm run dev
```

Open the app at http://localhost:5173.

## API Contract

The frontend expects a backend endpoint:

- `POST /api/shorten` with JSON body `{ "long_url": "https://example.com" }`
- Response JSON `{ "short_code": "abc123" }`

The app constructs the final short URL as:

$$
	ext{shortUrl} = \text{VITE_API_BASE_URL} + "/" + \text{short\_code}
$$

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build

## Notes

- If the backend is hosted elsewhere, update `VITE_API_BASE_URL` accordingly.
- The short link opens in a new tab and can be copied to the clipboard.
