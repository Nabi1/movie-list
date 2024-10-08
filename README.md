The app is deployed at [https://movie-list-theta-gules.vercel.app/](https://movie-list-theta-gules.vercel.app/)

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Instructions

### Search Page

- A large search field at the top of the page.
- No need for filtering.
- Pagination if possible.
- Display of movies in a table or thumbnail view (your choice) with:
  - Photo
  - Title
  - Clickable movie to access its sheet.

### Movie Page

- Back link for a new search.
- Title
- Photo
- Synopsis
- If possible, the list of the cast.

### Main Objective

The main objective is to have at least two responsive pages:

- A search page with a search field and below a list of results, each movie being clickable to view the movie's detail on a second page.
- A movie page based on the selection made on the previous page with at least a title, an image, and a description.

The goal is to use an API and the ReactJS framework.
