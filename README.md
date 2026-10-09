# Pixo — Pixabay Image Explorer

Pixo is a lightweight, responsive image-search website inspired by Pixabay. It uses the Pixabay API to load photos, illustrations, and vectors, with search, category shortcuts, filters, pagination, and an image-details dialog.

## Features

- Search Pixabay images by keyword
- Browse popular image categories
- Filter by image type and orientation
- Sort results by popularity or latest
- Load more results with pagination
- Open image details, navigate between results, and view the original image on Pixabay
- Responsive layout with lazy-loaded image thumbnails
- Server-side API proxy so the Pixabay API key is not exposed in browser code
- Safe-search enabled for API requests
- Vercel serverless API endpoint and caching headers

## Tech Stack

- HTML, CSS, and vanilla JavaScript
- Node.js (18 or newer)
- Pixabay API
- Vercel Serverless Functions

## Project Structure

```text
pixabay-clone/
├── api/
│   └── search.js       # Serverless endpoint that proxies Pixabay API requests
├── .env.example        # Example environment variable
├── index.html          # Front-end application
├── package.json        # Project metadata and Node.js engine requirement
└── README.md
```

## Prerequisites

- A [Pixabay account/API key](https://pixabay.com/api/docs/)
- Node.js 18 or newer
- A Vercel account for deployment

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/pixabay-clone.git
cd pixabay-clone
```

Replace `YOUR_USERNAME` with your GitHub username and update the repository URL if you use a different repository name.

### 2. Configure the Pixabay API key

Create a `.env` file in the project root:

```env
PIXABAY_API_KEY=your_pixabay_api_key_here
```

Get an API key from the [Pixabay API documentation](https://pixabay.com/api/docs/).

**Keep your API key private.** Do not commit `.env` or paste your real key into client-side JavaScript. The included `.env.example` is only a template and should contain no real credentials.

### 3. Run locally

The front end is a static `index.html` file and the API endpoint is a Vercel serverless function. To test the complete application locally, install the Vercel CLI and run the development server:

```bash
npm install -g vercel
vercel dev
```

Open the local URL printed by the CLI. When prompted, configure `PIXABAY_API_KEY` in your local environment or Vercel project settings.

Opening `index.html` directly as a file may not work for API searches because the `/api/search` endpoint needs to be served by a compatible local server.

## Deploy to Vercel

1. Push the project to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com/) and choose **Add New → Project**.
3. Import your GitHub repository.
4. In **Project Settings → Environment Variables**, add:
   - **Name:** `PIXABAY_API_KEY`
   - **Value:** your Pixabay API key
   - **Environment:** select the environments you need (Production, Preview, and/or Development).
5. Deploy the project. If you add or change the environment variable after deployment, redeploy.
6. Open your deployment URL and try searching for an image.

The repository uses a static HTML front end and a Vercel serverless function in `api/search.js`; a separate build command is not normally required.

## API Endpoint

The serverless endpoint is:

```text
GET /api/search
```

Example request:

```text
/api/search?q=mountains&image_type=photo&orientation=horizontal&page=1
```

Supported query parameters:

| Parameter | Purpose | Example |
|---|---|---|
| `q` | Search keywords | `mountains` |
| `image_type` | Image type | `photo`, `illustration`, `vector`, `all` |
| `orientation` | Image orientation | `horizontal`, `vertical`, `all` |
| `category` | Pixabay category | `nature` |
| `order` | Result order | `popular`, `latest` |
| `page` | Page number | `1` |
| `colors` | Color filter supported by Pixabay | `blue` |

The endpoint forwards allowed parameters to Pixabay, requests 30 results per page, enables safe search, and returns Pixabay's JSON response. Successful responses include caching headers. If the API key is missing, the endpoint returns an explanatory error; upstream rate limits and connection errors are also handled.

## Troubleshooting

- **`PIXABAY_API_KEY is not set`:** Add the environment variable in Vercel project settings and redeploy.
- **Search returns an error:** Check that the API key is valid and review the API response. You may have reached an API rate limit.
- **API route returns 404:** Confirm `api/search.js` is at the project root inside the `api` directory and that the project is deployed on Vercel.
- **Images do not load locally:** Run the project through `vercel dev` so the `/api/search` route is available.
- **Changes do not appear on Vercel:** Confirm the correct GitHub branch was deployed and inspect the latest deployment logs.

## Credits

- Image search and image data are provided by [Pixabay](https://pixabay.com/).
- Read the [Pixabay API documentation](https://pixabay.com/api/docs/) for API usage requirements and limits.

Pixo is an independent project inspired by image discovery websites. It is not affiliated with or endorsed by Pixabay.

## Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request describing the change.

## License

No license file was included with this project at the time this README was written. Unless you add a license, assume that all rights are reserved by the copyright holder. Add a `LICENSE` file if you want to specify reuse and distribution terms.
