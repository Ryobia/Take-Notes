const express = require("express");
const fs = require("fs");
const path = require("path");
const { note } = require("./db/db.json");
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('develop'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());


app.post("/api/notes", (req, res) => {

});

app.get("/api/notes", (req, res) => {

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