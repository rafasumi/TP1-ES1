const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', async (req, res) => {
  const albums = await Album.findAll({limit: 4});
  const artists = await Artist.findAll({limit: 4});
  res.render('index', {albums, artists});
});

const artistRouter = require('./controllers/artistController');
app.use('/artist', artistRouter);

const albumRouter = require('./controllers/albumController');
app.use('/album', albumRouter);

const ratingRouter = require('./controllers/ratingController');
const Album = require('./models/Album');
const Artist = require('./models/Artist');
app.use('/rating', ratingRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
