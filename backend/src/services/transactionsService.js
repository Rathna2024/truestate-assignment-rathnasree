import { JSONFile } from 'lowdb/node';
import { Low } from 'lowdb';
import path from 'path';
import { fileURLToPath } from 'url';

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFile = path.join(__dirname, '..', '..', 'data', 'db.json');
const adapter = new JSONFile(dbFile);
const db = new Low(adapter, { transactions: [] });

function norm(s) { return (s || '').toString().toLowerCase(); }

// Full-text search
function applyFullText(items, q) {
    if (!q) return items;
    const qo = q.trim().toLowerCase();
    return items.filter(it =>
        (it.customerName && it.customerName.toLowerCase().includes(qo)) ||
        (it.phoneNumber && it.phoneNumber.toLowerCase().includes(qo))
    );
}

// Filters
function applyFilters(items, filters) {
    if (!filters || Object.keys(filters).length === 0) return items;

    return items.filter(it => {
        if (filters.customerRegion?.length && !filters.customerRegion.includes(it.customerRegion)) return false;
        if (filters.gender?.length && !filters.gender.includes(it.gender)) return false;

        if (filters.age && filters.age.length === 2) {
            const [min, max] = filters.age;
            if (!(it.age >= min && it.age <= max)) return false;
        }

        if (filters.productCategory?.length && !filters.productCategory.includes(it.productCategory)) return false;

        if (filters.tags?.length) {
            const has = filters.tags.every(t => (it.tags || []).includes(t));
            if (!has) return false;
        }

        if (filters.paymentMethod?.length && !filters.paymentMethod.includes(it.paymentMethod)) return false;

        if (filters.date?.length === 2) {
            const d = new Date(it.date);
            if (d < new Date(filters.date[0]) || d > new Date(filters.date[1])) return false;
        }

        return true;
    });
}

// Sorting
function applySort(items, sortBy, sortDir) {
    const dir = sortDir === 'asc' ? 1 : -1;

    return items.sort((a, b) => {
        let va = a[sortBy];
        let vb = b[sortBy];

        if (sortBy === 'date') {
            va = new Date(a.date);
            vb = new Date(b.date);
        }
        if (typeof va === 'string') va = va.toLowerCase();
        if (typeof vb === 'string') vb = vb.toLowerCase();

        if (va > vb) return dir;
        if (va < vb) return -dir;
        return 0;
    });
}

export async function queryTransactions({ q, filters, sortBy, sortDir, page, pageSize }) {
    await db.read();

    let items = db.data.transactions;

    items = applyFullText(items, q);
    items = applyFilters(items, filters);
    items = applySort(items, sortBy, sortDir);

    const total = items.length;
    const totalPages = Math.max(1, Math.ceil(total / pageSize));
    const p = Math.min(Math.max(1, page), totalPages);

    const paged = items.slice((p - 1) * pageSize, p * pageSize);

    return {
        meta: { total, totalPages, page: p, pageSize },
        data: paged
    };
}
