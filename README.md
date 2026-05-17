# Property Management System (PMS)

Full-stack PMS monorepo with React + Vite frontend and Express + TypeScript backend.

## Getting started

```bash
npm install --workspaces
npm run dev
```

The dev script starts the API on port 3001 and the Vite frontend on port 5173 with proxying of `/api`.

## Project structure
- `shared`: Shared TypeScript models.
- `server`: Express API with in-memory repositories and sample data.
- `web`: React UI with dashboard, rental list, property details tabs, rates/fees placeholders, payment schedule, and rooms views.
