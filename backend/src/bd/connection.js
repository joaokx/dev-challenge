const mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'multisearch'
});

connection.connect();

// Create tables
connection.query(`CREATE TABLE purchaseOrders (id INT AUTO_INCREMENT PRIMARY KEY, data JSON);
                  CREATE TABLE equipments (id INT AUTO_INCREMENT PRIMARY KEY, data JSON);
                  CREATE TABLE materials (id INT AUTO_INCREMENT PRIMARY KEY, data JSON);
                  CREATE TABLE salesOrders (id INT AUTO_INCREMENT PRIMARY KEY, data JSON);
                  CREATE TABLE workforce (id INT AUTO_INCREMENT PRIMARY KEY, data JSON);`, (err) => {
  if (err) throw err;
  console.log('Tables created successfully!');
});

function saveDataToMySQL(data) {
    data.forEach(item => {
      if (item.type === 'purchaseOrders') {
        connection.query('INSERT INTO purchaseOrders (data) VALUES (?)', [item], function (err) {
          if (err) throw err;
          console.log('Data saved to purchaseOrders table');
        });
      } else if (item.type === 'equipments') {
        connection.query('INSERT INTO equipments (data) VALUES (?)', [item], function (err) {
          if (err) throw err;
          console.log('Data saved to equipments table');
        });
      }else if (item.type === 'materials') {
        connection.query('INSERT INTO materials (data) VALUES (?)', [item], function (err) {
          if (err) throw err;
          console.log('Data saved to materials table');
        });
      }else if (item.type === 'salesOrders') {
        connection.query('INSERT INTO salesOrders (data) VALUES (?)', [item], function (err) {
          if (err) throw err;
          console.log('Data saved to salesOrders table');
        });
      }else if (item.type === 'workforce') {
        connection.query('INSERT INTO workforce (data) VALUES (?)', [item], function (err) {
          if (err) throw err;
          console.log('Data saved to workforce table');
        });
      }
    });
    connection.end();
}
