const router = require('express').Router();
const Artist = require('../models/Artist');
const objectFilter = require('../middlewares/objectFilter');

router.get('/create',
  (req, res) => {
    res.render('createArtist');
  },
);

router.post('/',
  objectFilter(['body'], ['name', 'musicalGender', 'country', 'image']),
  artistValidate('create'),
  async (req, res) => {
    const artist = {
      name: req.body.name,
      musicalGender: req.body.musicalGender,
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
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) res.status(404).json('Artista não encontrado').end();
    else res.render('artist', {artist});
  },
);

router.put('/:id',
  objectFilter(['body'], ['name', 'musicalGender', 'country', 'image']),
  artistValidate('update'),
  async (req, res) => {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) res.status(404).json('Artista não encontrado').end();
    else {
      await artist.update(req.body);
      res.status(200).end();
    }
  },
);

router.delete('/:id',
  async (req, res) => {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) res.status(404).json('Artista não encontrado').end();
    else {
      await artist.destroy();
      res.status(200).end();
    }
  },
);

module.exports = router;
