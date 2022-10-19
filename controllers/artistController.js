const Artist = require('../models/Artist');
const router = require('express').Router();

router.get('/create',
  (req, res) => {
    res.render('createArtist');
  },
);

router.post('/',
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
    res.render('viewArtists', {artists});
  },
);

router.get('/:id',
  async (req, res) => {
    const artist = await Artist.findByPk(req.params.id);
    res.render('artist', {artist});
  },
);

router.put('/:id',
  async (req, res) => {
    const artist = await Artist.findByPk(req.params.id);
    await artist.update(req.body);
    res.status(200).end();
  },
);

router.delete('/:id',
  async (req, res) => {
    const artist = await Artist.findByPk(req.params.id);
    await artist.destroy();
    res.status(200).end();
  },
);

module.exports = router;
