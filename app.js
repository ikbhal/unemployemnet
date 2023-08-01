const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3011;

app.use(express.static('public'));

app.get('/data', (req, res) => {
  const db = new sqlite3.Database('youth_unemployment.db');
  const query = 'SELECT country, unemployment_rate, global_rank, available_data FROM countries ORDER BY global_rank ASC';

  db.all(query, (err, rows) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });

  db.close();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
