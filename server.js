const express = require("express");
const fs = require("fs");
const path = require("path");
const { notes } = require("./db/db.json");
const PORT = process.env.PORT || 3001;
const router = require("express").Router();

const app = express();

app.use(express.static('public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

function addNote(body, noteArr) {
  const note = body;
  noteArr.push(note);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify({ notes: noteArr }, null, 2)
  );

  return animal;
}


router.post("/api/notes", (req, res) => {
  req.body.id = notes.length.toString();

  const note = addNote(req.body, notes);
  res.json(note);
});

router.get("/api/notes", (req, res) => {
  res.json(notes);

});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
  });