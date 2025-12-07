import React, { useEffect, useState } from 'react';
import api from '../services/api';
import FiltersPanel from '../components/FiltersPanel';
import TransactionsTable from '../components/TransactionsTable';

export default function App(){
  const [q, setQ] = useState('');
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('date');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({ total:0, totalPages:1, page:1 });

  async function fetchData(){
    const res = await api.getTransactions({ q, filters, sortBy, sortDir, page, pageSize });
    setData(res.data);
    setMeta(res.meta);
  }

  useEffect(()=>{ fetchData(); }, [q, filters, sortBy, sortDir, page]);

  return (
    <div className="app">
      <div className="header">
        <h2>Retail Sales — TruEstate Assignment</h2>
        <div>
          <input className="search" placeholder="Search customer name or phone..." value={q}
            onChange={e=>{ setQ(e.target.value); setPage(1); }} />
        </div>
      </div>

      <div className="panel">
        <div className="filter-panel">
          <FiltersPanel onChange={(newFilters)=>{ setFilters(newFilters); setPage(1); }} />
        </div>

        <div style={{flex:1, paddingLeft:16}}>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:8}}>
            <div>
              <label className="small">Sort:</label>
              <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{marginLeft:8}}>
                <option value="date">Date (Newest)</option>
                <option value="quantity">Quantity</option>
                <option value="customerName">Customer Name (A-Z)</option>
              </select>
              <select value={sortDir} onChange={e=>setSortDir(e.target.value)} style={{marginLeft:8}}>
                <option value="desc">Desc</option>
                <option value="asc">Asc</option>
              </select>
            </div>
            <div className="small">Page {meta.page} of {meta.totalPages} — Total {meta.total}</div>
          </div>

          <TransactionsTable items={data} />

          <div className="pagination">
            <button className="button" onClick={()=>setPage(p=>Math.max(1,p-1))}>Previous</button>
            <div className="small">Page {meta.page} / {meta.totalPages}</div>
            <button className="button" onClick={()=>setPage(p=>Math.min(meta.totalPages, p+1))}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
