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

router.get('/:id',
  async (req, res) => {
    const artist = await Artist.findOne({id: req.params.id});
    res.render('viewArtist', {artist});
  },
);

router.get('/',
  async (req, res) => {
    const artists = await Artist.findAll();
    res.status(200).json(artists);
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
