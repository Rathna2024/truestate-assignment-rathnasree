import { queryTransactions } from '../services/transactionsService.js';

export async function listTransactions(req, res) {
    try {
        const q = req.query.q || '';
        const filters = req.query.filters ? JSON.parse(req.query.filters) : {};
        const sortBy = req.query.sortBy || 'date';
        const sortDir = req.query.sortDir || 'desc';
        const page = parseInt(req.query.page || '1', 10);
        const pageSize = parseInt(req.query.pageSize || '10', 10);

        const result = await queryTransactions({ q, filters, sortBy, sortDir, page, pageSize });
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
