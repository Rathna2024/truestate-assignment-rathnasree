# Architecture Document

## Backend architecture
- Entry: backend/src/index.js
- Express server with routes defined in backend/src/routes/transactions.js
- Controller in backend/src/controllers/transactionsController.js
- Service in backend/src/services/transactionsService.js handles data retrieval, search, filter, sort, paginate logic.
- Data persistence: lowdb file-based JSON (backend/data/db.json) for simplicity. A seed script generates sample data.

## Frontend architecture
- Entry: frontend/src/main.jsx
- Pages: frontend/src/pages/App.jsx (single-page layout)
- Components: SearchBar, FiltersPanel, TransactionsTable, Pagination controls.
- Services: frontend/src/services/api.js wraps axios calls to backend.

## Data flow
- Frontend sends queries to /api/transactions with query parameters (q, filters, sortBy, sortDir, page).
- Backend service reads data, applies full-text search, filters, sorting, and returns paginated results and metadata.

## Folder structure
root/
 ├── backend/
 │    ├── src/
 │    │    ├── controllers/
 │    │    ├── services/
 │    │    ├── utils/
 │    │    ├── routes/
 │    │    └── index.js
 │    ├── package.json
 │    └── README.md
 ├── frontend/
 │    ├── src/
 │    │    ├── components/
 │    │    ├── pages/
 │    │    ├── services/
 │    │    └── main.jsx
 │    ├── package.json
 │    └── README.md
 ├── docs/architecture.md
 └── README.md

## Module responsibilities
- transactionsService: centralized logic for searching/filtering/sorting/pagination.
- controllers: parse request, call service, return standardized response.
- frontend components: present filters/search UI and keep UI state; send requests to backend and render results.

