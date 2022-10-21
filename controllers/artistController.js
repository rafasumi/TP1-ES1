const router = require('express').Router();
const Artist = require('../models/Artist');
const Album = require('../models/Album');
const objectFilter = require('../middlewares/objectFilter');
const artistValidate = require('../middlewares/artistValidator');

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
    if (!artists) res.status(404).json('Artistas não encontrados').end();
    else res.render('viewArtists', {artists});
  },
);

router.get('/:id',
  async (req, res) => {
    const artist = await Artist.findByPk(req.params.id, {include: Album});
    if (!artist) res.status(404).json('Artista não encontrado').end();
    else {
      artist.Albums = artist.Albums.map((album) => album.dataValues);
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
    if (!artist) res.status(404).json('Artista não encontrado').end();
    else {
      await artist.update(req.body);
      res.redirect(`/artist/${id}`);
    }
  },
);

router.post('/delete/',
  async (req, res) => {
    const artist = await Artist.findByPk(req.body.id);
    if (!artist) res.status(404).json('Artista não encontrado').end();
    else {
      await artist.destroy();
      res.redirect('/artist/all');
    }
  },
);

module.exports = router;
