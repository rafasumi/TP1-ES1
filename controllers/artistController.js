const Artist = require('../models/Artist');
const router = require('express').Router();

router.post('/createArtist',
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

router.get('/getArtists',
  async (req, res) => {
    const artists = await Artist.findAll();
    res.status(200).json(artists);
  });

router.put('/updateArtist/:id',
  async (req, res) => {
    const artist = await Artist.findByPk(req.params.id);
    await artist.update(req.body);
    res.status(200).end();
  });

router.delete('/deleteArtist/:id',
  async (req, res) => {
    const artist = await Artist.findByPk(req.params.id);
    await artist.destroy();
    res.status(200).end();
  });

module.exports = router;
