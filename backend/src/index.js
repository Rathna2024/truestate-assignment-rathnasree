import express from 'express';
import cors from 'cors';
import transactionsRoute from './routes/transactions.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactionsRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> console.log(`Backend running on http://localhost:${PORT}`));
