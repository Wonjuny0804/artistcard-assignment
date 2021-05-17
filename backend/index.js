const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();
const { downloadFile } = require('./s3');

console.log('===================', process.env.mysql_host);
// db 연결
const connection = mysql.createConnection({
  host: process.env.mysql_host,
  user: process.env.mysql_user,
  password: process.env.mysql_password,
  database: process.env.mysql_database
});
connection.connect();

const app = express();
app.use(express.json());
app.use(cors());

let songs = [];
let albums = [];

connection.query('SELECT * FROM songs',  (error, rows, fields) => {
  if (error) throw error;
  songs = [...rows];
  songs = songs.map(song => ({...song, song_url: ''}));
});

connection.query('SELECT * FROM albums', (error, rows, fields) => {
  if (error) throw error;
  albums = [...rows];
});

app.get('/songs', async (req, res) => {
  try {
    songs = await Promise.all(songs.map(async song => {
      const song_url = await downloadFile(`${song.name}.mp3`);
      return {...song, song_url};
    }));
  } catch (err) {
    res.send(err);
  }

  res.send(songs);
});

app.get('/albums', async (req, res) => {

  try {
    albums = await Promise.all(albums.map(async album => {
      const album_cover = await downloadFile(`${album.artist}.jpg`);
      return {...album, album_cover};
    }));
  } catch (err) {
    res.send(err);
  }
  res.send(albums);
});


// app listen
app.listen(8001, () => console.log('Server Up and running at 8001'));