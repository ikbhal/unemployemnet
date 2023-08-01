const sqlite3 = require('sqlite3').verbose();
const csvParser = require('csv-parser');
const fs = require('fs');

const db = new sqlite3.Database('youth_unemployment.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS countries (country TEXT, unemployment_rate REAL, global_rank INTEGER, available_data TEXT)');

  const csvFilePath = 'Youth unemployment - Country rankings.csv';

  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on('data', (row) => {
      db.run('INSERT INTO countries (country, unemployment_rate, global_rank, available_data) VALUES (?, ?, ?, ?)', [row.Countries, row['Youth unemployment, 2022'], row['Global rank'], row['Available data']]);
    })
    .on('end', () => {
      console.log('CSV data imported successfully.');
      db.close();
    });
});
