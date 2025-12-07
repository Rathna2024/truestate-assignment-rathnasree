import React, { useState } from 'react';

/* Simple filter panel that returns a filters object:
{
  customerRegion: [...],
  gender: [...],
  age: [min,max],
  productCategory: [...],
  tags: [...],
  paymentMethod: [...],
  date: [from,to]
}
*/
const options = {
  customerRegion: ['North','South','East','West'],
  gender: ['Male','Female','Other'],
  productCategory: ['Electronics','Furniture','Clothing','Grocery'],
  tags: ['sale','new','popular','clearance','online'],
  paymentMethod: ['Cash','Card','UPI']
};

function ToggleList({ name, values, selected, onChange }){
  function toggle(v){
    const s = new Set(selected || []);
    if(s.has(v)) s.delete(v); else s.add(v);
    onChange(Array.from(s));
  }
  return <div>
    <div style={{fontWeight:'600', marginBottom:6}}>{name}</div>
    <div style={{display:'flex', gap:6, flexWrap:'wrap'}}>
      {values.map(v=>(
        <button key={v} className="button" onClick={()=>toggle(v)} style={{background: (selected||[]).includes(v) ? '#eef' : 'white'}}>
          {v}
        </button>
      ))}
    </div>
  </div>;
}

export default function FiltersPanel({ onChange }){
  const [local, setLocal] = useState({});
  const setField = (k,v) => {
    const nxt = {...local, [k]: v};
    // remove empty
    Object.keys(nxt).forEach(key=>{ if(nxt[key] === null || (Array.isArray(nxt[key]) && nxt[key].length===0)) delete nxt[key]; });
    setLocal(nxt);
    onChange(nxt);
  };

  return (
    <div>
      <ToggleList name="Region" values={options.customerRegion} selected={local.customerRegion} onChange={v=>setField('customerRegion', v)} />
      <div style={{height:12}} />
      <ToggleList name="Gender" values={options.gender} selected={local.gender} onChange={v=>setField('gender', v)} />
      <div style={{height:12}} />
      <div>
        <div style={{fontWeight:600}}>Age Range</div>
        <div style={{display:'flex', gap:8, marginTop:8}}>
          <input placeholder="min" style={{width:70}} onChange={e=>setField('age', [Number(e.target.value||0), (local.age && local.age[1])||100])} />
          <input placeholder="max" style={{width:70}} onChange={e=>setField('age', [(local.age && local.age[0])||0, Number(e.target.value||100)])} />
        </div>
      </div>

      <div style={{height:12}} />
      <ToggleList name="Category" values={options.productCategory} selected={local.productCategory} onChange={v=>setField('productCategory', v)} />
      <div style={{height:12}} />
      <ToggleList name="Tags" values={options.tags} selected={local.tags} onChange={v=>setField('tags', v)} />
      <div style={{height:12}} />
      <ToggleList name="Payment" values={options.paymentMethod} selected={local.paymentMethod} onChange={v=>setField('paymentMethod', v)} />
      <div style={{height:12}} />
      <div>
        <div style={{fontWeight:600}}>Date Range</div>
        <div style={{display:'flex', gap:8, marginTop:8}}>
          <input type="date" onChange={e=>setField('date', [e.target.value, (local.date && local.date[1])||new Date().toISOString().slice(0,10)])} />
          <input type="date" onChange={e=>setField('date', [(local.date && local.date[0])||'1970-01-01', e.target.value])} />
        </div>
      </div>

      <div style={{marginTop:12}}>
        <button className="button" onClick={()=>{ setLocal({}); onChange({}); }}>Clear</button>
      </div>
    </div>
  );
}
