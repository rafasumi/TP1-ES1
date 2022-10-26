const router = require('express').Router();

const Rating = require('../models/Rating');
const Album = require('../models/Album');

const ratingValidate = require('../middlewares/ratingValidator');
const objectFilter = require('../middlewares/objectFilter');

router.post('/',
  objectFilter(['body'], ['albumId', 'value', 'comment', 'email', 'username']),
  ratingValidate('create'),
  async (req, res) => {
    const {albumId} = req.body;

    const album = await Album.findByPk(albumId);
    const ratingWithSameEmail = await Rating.findOne(
      {where: {
        albumId: albumId,
        email: req.body.email,
      }},
    );

    if (!album) res.status(404).render('404', {erro: 'Álbum não encontrado.'});
    else if (ratingWithSameEmail) {
      res.render('400', {errors: [{msg: 'Já existe uma avaliação associada a esse e-mail para tal álbum.'}]});
    } else {
      const rating = {
        value: req.body.value,
        comment: req.body.comment,
        email: req.body.email,
        username: req.body.username,
        albumId: req.body.albumId,
      };

      await Rating.create(rating);

      res.redirect(`/album/${req.body.albumId}`);
    }
  },
);

module.exports = router;
