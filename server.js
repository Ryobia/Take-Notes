const express = require("express");
const fs = require("fs");
const path = require("path");
const {notes} = require("./db/db");
console.log(notes);

const PORT = process.env.PORT || 3001;

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

  return note;
}


app.post("/api/notes", (req, res) => {
  req.body.id = notes.length.toString();

  const note = addNote(req.body, notes);
  res.json(note);
});

app.get("/api/notes", (req, res) => {
  let results = notes;
  res.json(results);

});

app.delete("/api/notes/:id", (req, res) => {
  id = req.params.id;
  let newNotes = notes.filter(function(n)  {
    return n.id !== id;
});

//Did my best, this was able to create a new file but it would only delete one note per server run
//If I want to delete multiple notes I have to restart the server after each delete for it to take effect.

// try {
//   fs.writeFileSync('./db/db.json', JSON.stringify(newNotes, null, 2));
//   //file written successfully
// } catch (err) {
//   console.error(err)
// }
  res.send(newNotes);
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