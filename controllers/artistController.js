const router = require('express').Router();
const Artist = require('../models/Artist');
const Album = require('../models/Album');

const objectFilter = require('../middlewares/objectFilter');
const artistValidate = require('../middlewares/artistValidator');

const getAverageRating = require('./utils');

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
    const artists = await Artist.findAll();
    if (!artists) res.status(404).render('404', {erro: 'Artistas não encontrados.'});
    else res.render('viewArtists', {artists});
  },
);

router.get('/averageAlbumRatings',
  async (req, res) => {
    const {artistId} = req.body;

    const albums = await Album.findAll({where: {artistId: artistId}});

    if (!albums.length) {
      res.status(404).render('404', {erro: 'Álbuns não encontrados para esse artista.'});
    } else {
      let sum = 0;
      const length = albums.length;

      for (let i = 0; i < length; i++) {
        const aux = parseFloat(
          await getAverageRating(albums[i].getDataValue('id')));
        sum += aux;
      }

      res.status(200).json((sum / length).toFixed(2)).end();
    }
  },
);

router.get('/:id',
  async (req, res) => {
    const artist = await Artist.findByPk(req.params.id, {include: Album});
    if (!artist) res.status(404).render('404', {erro: 'Artista não encontrado.'});
    else res.render('artist', {artist});
  },
);

router.post('/update',
  objectFilter(['body'], ['id', 'name', 'musicalGenre', 'country', 'image']),
  artistValidate('update'),
  async (req, res) => {
    const {id} = req.body;
    const artist = await Artist.findByPk(id);
    if (!artist) res.status(404).render('404', {erro: 'Artista não encontrado.'});
    else {
      await artist.update(req.body);
      res.redirect(`/artist/${id}`);
    }
  },
);

router.post('/delete',
  async (req, res) => {
    const artist = await Artist.findByPk(req.body.id);
    if (!artist) res.status(404).render('404', {erro: 'Artista não encontrado.'});
    else {
      await artist.destroy();
      res.redirect('/artist/all');
    }
  },
);

module.exports = router;
