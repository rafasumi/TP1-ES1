const router = require('express').Router();
const Artist = require('../models/Artist');
const Album = require('../models/Album');

const objectFilter = require('../middlewares/objectFilter');
const artistValidate = require('../middlewares/artistValidator');

const {Sequelize} = require('sequelize');
const Rating = require('../models/Rating');
const {getAverageArtistRating} = require('./utils');

router.get('/create',
  (req, res) => {
    res.render('createArtist');
  },
);

router.post('/',
  objectFilter(['body'], ['name', 'musicalGenre', 'country', 'image']),
  artistValidate('create'),
  async (req, res) => {
    const artist = {
      name: req.body.name,
      musicalGenre: req.body.musicalGenre,
      country: req.body.country,
      image: req.body.image,
    };

    const {id} = await Artist.create(artist);

    res.redirect(`/artist/${id}`);
  },
);

router.get('/all',
  async (req, res) => {
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
        group: ['Albums.id'],
      },
    );
    if (!artists)
      res.status(404).render('404', {erro: 'Artistas não encontrados.'});
    else {
      artists.forEach((artist) => {
        console.log(artist.Albums);
        artist.avgRating = getAverageArtistRating(artist.Albums);
      });
      res.render('viewArtists', {artists});
    }
  },
);

router.get('/:id',
  async (req, res) => {
    const artist = await Artist.findByPk(req.params.id,
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
        group: ['Albums.id'],
      },
    );
    if (!artist)
      res.status(404).render('404', {erro: 'Artista não encontrado.'});
    else {
      artist.avgRating = getAverageArtistRating(artist.Albums);
      res.render('artist', {artist});
    }
  },
);

router.post('/update',
  objectFilter(['body'], ['id', 'name', 'musicalGenre', 'country', 'image']),
  artistValidate('update'),
  async (req, res) => {
    const {id} = req.body;
    const artist = await Artist.findByPk(id);
    if (!artist)
      res.status(404).render('404', {erro: 'Artista não encontrado.'});
    else {
      await artist.update(req.body);
      res.redirect(`/artist/${id}`);
    }
  },
);

router.post('/delete',
  async (req, res) => {
    const artist = await Artist.findByPk(req.body.id);
    if (!artist) res.status(404).render(
      '404', {erro: 'Artista não encontrado.'});
    else {
      await artist.destroy();
      res.redirect('/artist/all');
    }
  },
);

module.exports = router;
