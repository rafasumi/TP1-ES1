const express = require('express');

const app = express();

app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const Album = require('./models/Album');
const Artist = require('./models/Artist');

const artistRouter = require('./controllers/artistController');
app.use('/artist', artistRouter);

const albumRouter = require('./controllers/albumController');
app.use('/album', albumRouter);

const ratingRouter = require('./controllers/ratingController');
app.use('/rating', ratingRouter);

app.get('/', async (req, res) => {
  const albums = await Album.findAll({limit: 4});
  const artists = await Artist.findAll({limit: 4});
  res.render('index', {albums, artists});
});

app.get('*', (req, res) => {
  res.render('404', {erro: 'Esta página não existe'});
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
