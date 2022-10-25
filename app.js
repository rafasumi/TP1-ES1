const express = require('express');
const {Sequelize} = require('sequelize');

const app = express();

app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const Album = require('./models/Album');
const Rating = require('./models/Rating');
const Artist = require('./models/Artist');
const {getAverageArtistRating} = require('./controllers/utils');

const artistRouter = require('./controllers/artistController');
app.use('/artist', artistRouter);

const albumRouter = require('./controllers/albumController');
app.use('/album', albumRouter);

const ratingRouter = require('./controllers/ratingController');
app.use('/rating', ratingRouter);

app.get('/', async (req, res) => {
  const albums = await Album.findAll(
    {
      attributes: [
        [Sequelize.fn('AVG', Sequelize.col('Ratings.value')), 'avgRating'],
        'id',
        'name',
        'image',
        'year',
      ],
      include: [Artist, Rating],
      group: ['Ratings.albumId'],
    },
  );
  if (!albums)
    return res.status(404).render('404', {erro: 'Álbuns não encontrados.'});

  const artists = await Artist.findAll(
    {
      include: [{
        model: Album,
        attributes: [
          [Sequelize.fn(
            'AVG', Sequelize.col('Albums.Ratings.value')), 'avgAlbumRating'],
          'id',
          'name',
          'image',
        ],
        include: [Rating],
        group: ['Ratings.albumId'],
      }],
      group: ['Artists.id'],
    },
  );
  if (!artists)
    return res.status(404).render('404', {erro: 'Artistas não encontrados.'});
  artists.forEach((artist) => {
    artist.avgRating = getAverageArtistRating(artist.Albums);
  });
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
