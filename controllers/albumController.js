const Album = require('../models/Album');
const Artist = require('../models/Artist');
const router = require('express').Router();

router.get('/create',
  async (req, res) => {
    const artists = await Artist.findAll();
    if (!artists) res.status(404).json('Artistas não encontrados').end();
    else res.render('createAlbum', {artists});
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
    if (!albums) res.status(404).json('Álbuns não encontrados').end();
    else res.render('viewAlbums', {albums});
  },
);

router.get('/:id',
  async (req, res) => {
    const album = await Album.findByPk(req.params.id, {include: Artist});
    if (!album) res.status(404).json('Álbum não encontrado').end();
    else res.render('album', {album});
  },
);

router.put('/:id',
  async (req, res) => {
    const album = await Album.findByPk(req.params.id);
    if (!album) res.status(404).json('Álbum não encontrado').end();
    else {
      await album.update(req.body);
      res.status(200).end();
    }
  },
);

router.delete('/:id',
  async (req, res) => {
    const album = await Album.findByPk(req.params.id);
    if (!album) res.status(404).json('Álbum não encontrado').end();
    else {
      await album.destroy();
      res.status(200).end();
    }
  },
);

module.exports = router;
