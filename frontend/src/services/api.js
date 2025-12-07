import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

async function getTransactions({ q='', filters={}, sortBy='date', sortDir='desc', page=1, pageSize=10 }){
  const params = {
    q,
    filters: JSON.stringify(filters),
    sortBy,
    sortDir,
    page,
    pageSize
  };
  const res = await axios.get(API_BASE + '/api/transactions', { params });
  return res.data;
}

export default { getTransactions };
