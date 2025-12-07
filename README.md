Overview

This project is my full-stack implementation of the TruEstate – Retail Sales Management System assignment.
The solution includes a Node.js + Express backend and a React (Vite) frontend.
The application supports:

Search

Multi-select filtering

Sorting

Server-side pagination

These features are applied on a dataset of retail sales transactions to produce fast and accurate results.

Tech Stack
Backend

Node.js

Express

lowdb (lightweight JSON database)

CORS

Frontend

React (Vite)

React Router

Axios

Tailwind CSS (optional)

Tools

npm

JavaScript (ES modules)

Search Implementation

The backend exposes an endpoint:

GET /api/transactions


It accepts several query parameters:

q – text search on customer name and phone

filters – JSON-encoded filter object

sortBy – field to sort

sortDir – asc/desc

page – page number

pageSize – number of items per page

Search is case-insensitive and works along with filters, sorting, and pagination.

Filter Implementation

The system supports multiple types of filters:

Customer region

Gender

Product category

Tags (array-based filter)

Payment method

Age range

Date range

All filters are handled on the server side, ensuring consistent results regardless of dataset size.

Sorting Implementation

Sorting can be applied on:

Date (latest first)

Quantity

Customer name (A → Z)

Sorting respects the currently active search and filters.

Pagination Implementation

Pagination is fully server-side:

Default pageSize = 10

The API returns:

Total number of matching records

Current page

Total pages

Data for the current page

How to Run
Backend
cd backend
npm install
npm run start

Frontend

Open another terminal:

cd frontend
npm install
npm run dev

Notes

Backend automatically generates a sample dataset the first time it runs (data/db.json).

You can replace the data with the CSV provided in the assignment if needed.

The frontend runs at:
http://localhost:5173
