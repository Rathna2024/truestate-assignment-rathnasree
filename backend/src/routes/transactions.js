import express from 'express';
import { listTransactions } from '../controllers/transactionsController.js';

const router = express.Router();

router.get('/', listTransactions);

export default router;
