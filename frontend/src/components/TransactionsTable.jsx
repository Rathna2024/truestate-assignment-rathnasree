import React from 'react';

export default function TransactionsTable({ items }){
  if(!items || items.length===0){
    return <div className="small">No records found.</div>;
  }
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Customer</th>
          <th>Phone</th>
          <th>Region</th>
          <th>Category</th>
          <th>Qty</th>
          <th>Final Amount</th>
        </tr>
      </thead>
      <tbody>
        {items.map(it=>(
          <tr key={it.id}>
            <td>{it.date}</td>
            <td>{it.customerName}</td>
            <td>{it.phoneNumber}</td>
            <td>{it.customerRegion}</td>
            <td>{it.productCategory}</td>
            <td>{it.quantity}</td>
            <td>{it.finalAmount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
