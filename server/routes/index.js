const express = require('express');
const router = express.Router();
const axios = require('axios');
const getSong = require('./getSong');

router.get('/', function (req, res) {
  const username = req.query.user;

  const FM_API = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&api_key=b5ec587a857114c0a57356ecb1a66af9&user=${username}&format=json`;

  axios
    .get(FM_API)
    .then((response) => {
      const { data } = response;
      const artist = data.recenttracks.track[0].artist['#text'];
      const track = data.recenttracks.track[0].name;

      const options = {
        apiKey: 'c835rfeAsbJfbjLbbCnrjLOkCWezb5c71iUiJk-9pQ4e4qm7uhbSmiwbreY6EvAd',
        title: track,
        artist: artist,
        optimizeQuery: false,
      };

      getSong(options)
        .then((song) => {
          const song_lyrics = song.lyrics;
          const song_url = song.url;
          const song_title = song.title;
          console.log(`${song_title} - ${song_url}`);
          // Modify the response format as needed
          res.json({ lyrics: song_lyrics, artist: song_title, url: song_url });
          if(song_lyrics == null){
            res.json({ lyrics: "No lyrics found" });
          }
        })
        .catch((error) => {
          console.error('Error retrieving lyrics:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        });
    })
    .catch((error) => {
      console.error('Error retrieving recent tracks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});


router.get('/test', function (req, res) {
  const username = req.query.user;

  res.json({ "test": username });

  
    
});
module.exports = router;







