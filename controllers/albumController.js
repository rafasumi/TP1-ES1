const router = require('express').Router();

const Album = require('../models/Album');
const Artist = require('../models/Artist');
const Rating = require('../models/Rating');

const objectFilter = require('../middlewares/objectFilter');
const albumValidate = require('../middlewares/albumValidator');

const getAverageRating = require('./utils');

router.get('/create',
  async (req, res) => {
    const artists = await Artist.findAll();
    if (!artists) res.status(404).render('404', {erro: 'Artistas não encontrados.'});
    else res.render('createAlbum', {artists});
  },
);

router.post('/',
  objectFilter(['body'], ['name', 'year', 'image', 'artist']),
  albumValidate('create'),
  async (req, res) => {
    const album = {
      name: req.body.name,
      year: req.body.year,
      image: req.body.image,
      artistId: req.body.artist,
    };

    const artist = await Artist.findByPk(album.artistId);
    if (!artist) res.status(404).render('404', {erro: 'Artista não encontrado.'});
    else {
      const {id} = await Album.create(album);
      res.redirect(`/album/${id}`);
    }
  },
);

router.get('/all',
  async (req, res) => {
    const albums = await Album.findAll({include: Artist});
    if (!albums) res.status(404).render('404', {erro: 'Álbuns não encontrados.'});
    else res.render('viewAlbums', {albums});
  },
);

router.get('/rating',
  async (req, res) => {
    const {id} = req.body;

    const album = await Album.findByPk(id, {include: [Artist, Rating]});
    if (!album) res.status(404).render('404', {erro: 'Álbum não encontrado.'});

    // const artists = await Artist.findAll();
    // if (!artists) res.status(404).json('Artistas não encontrados').end();

    else {
      const averageRating = await getAverageRating(id);

      res.status(200).json(averageRating).end();

    // Se quiser renderizar uma página com as avaliações do álbum
    // só retirar os comments da rota
    // res.render('album', {album, artists});
    }
  },
);

router.get('/:id',
  async (req, res) => {
    const album = await Album.findByPk(req.params.id,
      {include: [Artist, Rating]});
    const artists = await Artist.findAll();
    if (!album) res.status(404).render('404', {erro: 'Álbum não encontrado.'});
    else res.render('album', {album, artists});
  },
);

router.post('/update',
  objectFilter(['body'], ['id', 'name', 'year', 'image', 'artist']),
  albumValidate('update'),
  async (req, res) => {
    const {id} = req.body;
    const album = await Album.findByPk(id);
    if (!album) res.status(404).render('404', {erro: 'Álbum não encontrado.'});
    else {
      await album.update(req.body);
      res.redirect(`/album/${id}`);
    }
  },
);

router.post('/delete',
  async (req, res) => {
    const album = await Album.findByPk(req.body.id);
    if (!album) res.status(404).render('404', {erro: 'Álbum não encontrado.'});
    else {
      await album.destroy();
      res.redirect('/album/all');
    }
  },
);

module.exports = router;
