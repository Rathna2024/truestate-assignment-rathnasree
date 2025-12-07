Overview
This project is my full-stack solution for the TruEstate Retail Sales Management System assignment.
It contains a Node.js and Express backend and a React (Vite) frontend.
The system includes search, multi-select filters, sorting, and server-side pagination for sales transaction data.

Tech Stack
Backend: Node.js, Express, lowdb, CORS
Frontend: React (Vite), React Router, Axios, Tailwind CSS (optional)
Tools: npm

Search
The backend provides an API endpoint (/api/transactions) that supports:

q → text search on customer name and phone

filters → JSON object for filters

sortBy → field name

sortDir → asc or desc

page → page number

pageSize → number of results
Search is case-insensitive and works along with filters and sorting.

Filters
Supports multiple filters such as:

customer region

gender

product category

tags

payment method

age range

date range
All filters are applied on the backend.

Sorting
Sorting supports:

date (newest first)

quantity

customer name (A to Z)
Sorting respects active search and filters.

Pagination
Server-side pagination is used.
Default page size is 10.
The API returns total results, total pages, current page number, and data for that page.

How to Run

Backend:
cd backend
npm install
npm run start

Frontend:
cd frontend
npm install
npm run dev

Open the frontend at http://localhost:5173
.
The backend creates a sample dataset on first run (data/db.json).
You can replace it with the dataset provided in the assignment.
