const Album = require('../models/Album');
const router = require('express').Router();

router.post('/createAlbum',
  async (req, res) => {
    const album = {
      name: req.body.name,
      year: req.body.year,
      image: req.body.image,
    };

    await Album.create(album);

    res.status(201).end();
  });

router.get('/getAlbums',
  async (req, res) => {
    const albums = await Album.findAll();
    res.status(200).json(albums);
  });

router.put('/updateAlbum/:id',
  async (req, res) => {
    const album = await Album.findByPk(req.params.id);
    await album.update(req.body);
    res.status(200).end();
  });

router.delete('/deleteAlbum/:id',
  async (req, res) => {
    const album = await Album.findByPk(req.params.id);
    await album.destroy();
    res.status(200).end();
  });

module.exports = router;
