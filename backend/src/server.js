// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

// habilita o CORS para todas as rotas
app.use(cors());

app.get('/purchaseOrders', (req, res) => {
    const purchaseOrders = JSON.parse(fs.readFileSync('../data/purchase_orders.json'));
    res.json(purchaseOrders);
    });
    app.get('/equipments', (req, res) => {
    const equipments = JSON.parse(fs.readFileSync('../data/equipments.json'));
    res.json(equipments);
    });
    app.get('/materials', (req, res) => {
    const materials = JSON.parse(fs.readFileSync('../data/materials.json'));
    res.json(materials);
    });
    app.get('/salesOrders', (req, res) => {
    const salesOrders = JSON.parse(fs.readFileSync('../data/sales_orders.json'));
    res.json(salesOrders);
    });
    app.get('/workforce', (req, res) => {
    const workforce = JSON.parse(fs.readFileSync('../data/workforce.json'));
    res.json(workforce);
    });
app.get('/search', (req, res) => {
  const searchText = req.query.text.toLowerCase();
  let results = [];
  const tables = ['equipments', 'materials', 'purchase_orders', 'sales_orders', 'workforce'];

  tables.forEach(table => {
    const data = JSON.parse(fs.readFileSync(`../data/${table}.json`));
    data.forEach(item => {
      for (let key in item) {
        if (typeof item[key] === 'string' && item[key].includes(searchText)!== -1) {
          results.push(item);
          break;
        }
      }
    });
  });

  let normalizedResults = results.map(result => {
    let normalizedResult = {};
    for (let key in result) {
      if (key === 'id') {
        normalizedResult['id'] = result[key];
      } else {
        if (typeof result[key] === 'string') {
          normalizedResult[key] = result[key].toLowerCase();
        } else {
          normalizedResult[key] = result[key];
        }
      }
    }
    return normalizedResult;
  });
  // Filtrando resultados vazios
  normalizedResults = normalizedResults.filter(result => result.id && result.id !== "- - - -");
  res.json(normalizedResults);
});

app.listen(3333, () => {
  console.log('API escutando na porta 3333');
});
