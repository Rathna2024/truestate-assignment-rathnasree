Backend README
1. Install: npm install
2. Seed sample data (first run): npm run seed
3. Start server: npm run start
API: GET /api/transactions
Query params:
 - q (string): full-text search on customerName and phone
 - filters (stringified JSON): e.g. {"gender":["Male"],"customerRegion":["South"],"age":[20,40],"date":["2024-01-01","2024-12-31"]}
 - sortBy (date|quantity|customerName)
 - sortDir (asc|desc)
 - page (1-based)
 - pageSize (default 10)
