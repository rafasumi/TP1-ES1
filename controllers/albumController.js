const Album = require('../models/Album');
const Artist = require('../models/Artist');
const router = require('express').Router();

router.get('/create',
  async (req, res) => {
    const artists = await Artist.findAll();
    res.render('createAlbum', {artists});
  },
);

router.post('/',
  async (req, res) => {
    const album = {
      name: req.body.name,
      year: req.body.year,
      image: req.body.image,
      artistId: req.body.artist,
    };

    const {id} = await Album.create(album);

    res.redirect(`/album/${id}`);
  },
);

router.get('/all',
  async (req, res) => {
    const albums = await Album.findAll({include: Artist});
    res.render('viewAlbums', {albums});
  },
);

router.get('/:id',
  async (req, res) => {
    const album = await Album.findByPk(req.params.id);
    res.json(album);
  },
);

router.put('/:id',
  async (req, res) => {
    const album = await Album.findByPk(req.params.id);
    await album.update(req.body);
    res.status(200).end();
  },
);

router.delete('/:id',
  async (req, res) => {
    const album = await Album.findByPk(req.params.id);
    await album.destroy();
    res.status(200).end();
  },
);

module.exports = router;
