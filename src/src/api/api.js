const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  const results = [];

  const orders = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/sales_orders.json')));
  const products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/equipments.json')));

})