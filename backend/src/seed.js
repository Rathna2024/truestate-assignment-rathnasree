const fs = require('fs');
const path = require('path');
const { nanoid } = require('nanoid');

const out = path.join(__dirname, '..', 'data', 'db.json');
fs.mkdirSync(path.dirname(out), { recursive: true });

function randomPick(a){ return a[Math.floor(Math.random()*a.length)]; }
function randInt(a,b){ return a + Math.floor(Math.random()*(b-a+1)); }

const regions = ['North','South','East','West'];
const genders = ['Male','Female','Other'];
const categories = ['Electronics','Furniture','Clothing','Grocery'];
const tagsPool = ['sale','new','popular','clearance','online'];

const transactions = [];
for(let i=0;i<250;i++){
  const age = randInt(18,70);
  const tags = [];
  for(let t=0;t<randInt(1,3);t++) tags.push(randomPick(tagsPool));
  const quantity = randInt(1,10);
  const price = randInt(50,2000);
  const discount = [0,5,10,15,20][Math.floor(Math.random()*5)];
  const total = quantity * price;
  const finalAmount = total - (total * discount / 100);
  const date = new Date(Date.now() - Math.floor(Math.random()*1000*60*60*24*365)).toISOString().split('T')[0];
  transactions.push({
    id: nanoid(),
    customerId: 'C' + randInt(1000,9999),
    customerName: ['Asha','Ravi','Suresh','Meena','John','Priya','Vikram'][Math.floor(Math.random()*7)] + ' ' + randInt(1,99),
    phoneNumber: '9' + randInt(100000000,999999999).toString().slice(0,9),
    gender: randomPick(genders),
    age,
    customerRegion: randomPick(regions),
    customerType: randomPick(['Retail','Wholesale']),
    productId: 'P' + randInt(100,999),
    productName: randomPick(['Widget','Gadget','Sofa','Shirt','Rice']),
    brand: randomPick(['BrandA','BrandB','BrandC']),
    productCategory: randomPick(categories),
    tags,
    quantity,
    pricePerUnit: price,
    discountPercentage: discount,
    totalAmount: total,
    finalAmount,
    date,
    paymentMethod: randomPick(['Cash','Card','UPI']),
    orderStatus: randomPick(['Delivered','Pending','Cancelled']),
    deliveryType: randomPick(['Home Delivery','Store Pickup']),
    storeId: 'S' + randInt(1,10),
    storeLocation: randomPick(['Mumbai','Delhi','Bengaluru','Hyderabad']),
    salespersonId: 'E' + randInt(100,999),
    employeeName: randomPick(['Kumar','Anita','Ramesh'])
  });
}

fs.writeFileSync(out, JSON.stringify({ transactions }, null, 2), 'utf-8');
console.log('Seeded', transactions.length, 'transactions to', out);
