# API Forge

API Forge is a React and Vite prototype for frontend developers who need a temporary REST API without writing backend boilerplate. Describe the backend you want in plain language, generate an API entry, and manage the generated endpoints from the **My APIs** view.

## Features

- Natural-language API generation prompts
- Starter templates for common projects such as e-commerce, blogs, social media, and task management
- Temporary generated endpoint display with copy-to-clipboard support
- Local sign-up and sign-in flow for the prototype
- API history persisted in browser `localStorage`
- Light and dark theme support
- Optional Google Gemini descriptions for generated APIs

## Tech stack

- React 19
- Vite
- Tailwind CSS 4
- Google Gemini API, optional
- Oxlint

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open the local URL printed by Vite in your browser.

## Environment variables

Gemini integration is optional. Without an API key, the app uses a local fallback message and remains usable.

Create a `.env.local` file in the project root if you want Gemini-generated API descriptions:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_GEMINI_MODEL=gemini-3.8-flash
```

Restart the development server after changing environment variables. Because Vite exposes `VITE_*` variables to browser code, use a key intended for client-side development and apply the appropriate restrictions in Google AI Studio.

## Available scripts

```bash
npm run dev      # Start the Vite development server
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Run Oxlint
```

## Project structure

```text
src/
	components/    Shared layout, header, footer, and icon components
	contexts/      React context definitions
	pages/         Home, authentication, API history, and placeholder pages
	providers/     Context provider implementations
	services/      External service integrations such as Gemini
	App.jsx        Application provider and layout composition
```

## Data and limitations

This is a frontend prototype. Accounts and generated API records are stored only in the current browser through `localStorage`; there is no persistent server-side authentication or API service in this repository. Generated endpoints are temporary and are intended for demonstrating the product flow.

To reset local data, clear this site’s browser storage or use the browser developer tools to remove the application’s `localStorage` entries.
