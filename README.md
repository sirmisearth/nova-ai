# NOVA AI — secure starter

Mobile-friendly chat interface plus a Node.js backend that calls Gemini without exposing the API key in browser code.

## Security
Never put your API key in `public/index.html`, frontend JavaScript, or a public GitHub repository. If a key was shared publicly or in chat, revoke it and create a replacement.

## Run locally
Requires Node.js 20+.
1. `npm install`
2. Copy `.env.example` to `.env` and put your key in `.env`.
3. `npm start`
4. Open `http://localhost:3000`

The `.env` file is ignored by Git. For hosted deployment, configure `GEMINI_API_KEY` in your hosting provider's server-side environment/secrets settings instead of committing `.env`.

## Deployment note
This is a full-stack Node.js app. GitHub Pages only hosts static files and cannot run `server.js`; the backend needs a Node.js host that supports environment secrets. Check current free-tier limits before deploying.

## Current scope
Responsive chat UI, server-side Gemini request, input validation and error messages. Login, chat history, voice, image generation, and rate limiting are not implemented yet.
