Overview
A sample full-stack implementation for the TruEstate Retail Sales Management System assignment.
This repository includes a Node.js backend (Express) and a React + Vite frontend implementing search,
multi-select filters, sorting, and pagination over sales transactions.

Tech Stack
- Backend: Node.js, Express, lowdb (file DB for simplicity), cors
- Frontend: React (Vite), React Router, axios, Tailwind CSS (optional)
- Dev tools: npm

Search Implementation Summary
Backend exposes a /api/transactions endpoint that accepts query parameters:
 q (full-text on customer name and phone), filters (JSON), sortBy, sortDir, page, pageSize.
Search is case-insensitive and works together with filters and sorting.

Filter Implementation Summary
Supports multi-select filters for customerRegion, gender, productCategory, tags (array),
paymentMethod and range filters for age and date range. Filters are applied server-side.

Sorting Implementation Summary
Supports sorting by date (newest first), quantity, and customerName (A-Z). Sorting respects
active search and filters.

Pagination Implementation Summary
Server-side pagination with pageSize=10 by default. API returns total count and page metadata.

Setup Instructions
1. Unzip and go to backend: cd backend && npm install && npm run start
2. In another terminal go to frontend: cd frontend && npm install && npm run dev
3. Backend seeds a sample dataset at first run (data/db.json). Replace with provided dataset CSV if needed.
4. Open frontend at http://localhost:5173 (Vite default) and interact with the UI.

