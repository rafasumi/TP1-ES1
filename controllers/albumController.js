const router = require('express').Router();
const {Sequelize} = require('sequelize');

const Album = require('../models/Album');
const Artist = require('../models/Artist');
const Rating = require('../models/Rating');

const objectFilter = require('../middlewares/objectFilter');
const albumValidate = require('../middlewares/albumValidator');

router.get('/create',
  async (req, res) => {
    const artists = await Artist.findAll();
    if (!artists) res.status(404).json('Artistas não encontrados').end();
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
    if (!artist) res.status(404).json('Artista não encontrado').end();
    else {
      const {id} = await Album.create(album);
      res.redirect(`/album/${id}`);
    }
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
    const {id} = req.params;
    const album = await Album.findByPk(id,
      {
        attributes: [
          [Sequelize.fn('AVG', Sequelize.col('Ratings.value')), 'avgRating'],
          'id',
          'name',
          'image',
          'year',
        ],
        include: [Artist, Rating],
        group: ['Ratings.albumId'],
      },
    );
    if (!album) res.status(404).json('Álbum não encontrado').end();
    else {
      const artists = await Artist.findAll();
      const ratings = await Rating.findAll({where: {albumId: id}});
      res.render('album', {album, artists, ratings});
    }
  },
);

router.post('/update',
  objectFilter(['body'], ['id', 'name', 'year', 'image', 'artist']),
  albumValidate('update'),
  async (req, res) => {
    const {id} = req.body;
    const album = await Album.findByPk(id);
    if (!album) res.status(404).json('Álbum não encontrado').end();
    else {
      await album.update(req.body);
      res.redirect(`/album/${id}`);
    }
  },
);

router.post('/delete',
  async (req, res) => {
    const album = await Album.findByPk(req.body.id);
    if (!album) res.status(404).json('Álbum não encontrado').end();
    else {
      await album.destroy();
      res.redirect('/album/all');
    }
  },
);

module.exports = router;
