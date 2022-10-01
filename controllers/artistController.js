const Artist = require('../models/Artist');
const router = require('express').Router();

router.post('/',
  async (req, res) => {
    const artist = {
      name: req.body.name,
      musicalGender: req.body.musicalGender,
      country: req.body.country,
      image: req.body.image,
    };

    await Artist.create(artist);

    res.status(201).end();
  });

router.get('/',
  async (req, res) => {
    const artists = await Artist.findAll();
    res.status(200).json(artists);
  });

module.exports = router;
