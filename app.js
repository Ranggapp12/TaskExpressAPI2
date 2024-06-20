const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

// Rute default untuk memeriksa apakah server berjalan
app.get('/', (req, res) => {
  res.send('Welcome to the Notes API');
});

// Membuat note baru
app.post('/notes', (req, res) => {
  const { title, datetime, note } = req.body;
  const sql = 'INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)';
  db.query(sql, [title, datetime, note], (err, result) => {
    if (err) throw err;
    res.status(201).send({ id: result.insertId, title, datetime, note });
  });
});

// Menampilkan semua notes
app.get('/notes', (req, res) => {
  const sql = 'SELECT * FROM notes';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.status(200).send(results);
  });
});

// Menampilkan salah satu note
app.get('/notes/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM notes WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.length === 0) {
      return res.status(404).send({ message: 'Note not found' });
    }
    res.status(200).send(result[0]);
  });
});

// Mengubah note
app.put('/notes/:id', (req, res) => {
  const { id } = req.params;
  const { title, datetime, note } = req.body;
  const sql = 'UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?';
  db.query(sql, [title, datetime, note, id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Note not found' });
    }
    res.status(200).send({ id, title, datetime, note });
  });
});

// Menghapus note
app.delete('/notes/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM notes WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: 'Note not found' });
    }
    res.status(200).send({ message: 'Note deleted' });
  });
});

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
