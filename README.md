# Netlify Commerce Layer Demo with SvelteKit

## Requirements

-   [Node.js](https://docs.netlify.com/cli/get-started/) v18
-   [Commerce Layer CLI](https://github.com/commercelayer/commercelayer-cli)
-   [Netlify CLI](https://docs.netlify.com/cli/get-started/)

## Uses

-   [Commerce Layer](https://commercelayer.io/developers)
-   [Commerce Layer SDK](https://github.com/commercelayer/commercelayer-sdk)
-   [Commerce Layer JS Auth](https://github.com/commercelayer/commercelayer-js-auth)
-   [Netlify](https://docs.netlify.com/)
-   [SvelteKit](https://kit.svelte.dev)
-   [Tailwind CSS](https://tailwindcss.com/docs/installation)
-   [Vite](https://vitejs.dev/guide/)

## Setup

```bash
$ nvm use
$ npm install -g @commercelayer/cli
$ npm install -g netlify-cli
```

## Build

```bash
$ npm run dev
```

## Configuration

### Environment Variables

| VITE_CL_CLIENT_ID | CommerceLayer API client ID |
| VITE_CL_BASE_URL | CommerceLayer API base URL |
| VITE_CL_SHARED_SECRET | CommerceLayer shared secret for webhook events |
