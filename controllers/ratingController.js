const Rating = require('../models/Rating');
const router = require('express').Router();
const ratingValidate = require('../middlewares/ratingValidator');
const objectFilter = require('../middlewares/objectFilter');

router.post('/',
  objectFilter(['body'], ['albumId', 'value', 'comment', 'email', 'username']),
  ratingValidate('create'),
  async (req, res) => {
    const ratingWithSameEmail = await Rating.findOne({email: req.body.email});
    if (ratingWithSameEmail)
      res.status(400).json(
        'Já existe uma avaliação associada a esse e-mail').end();

    const rating = {
      value: req.body.value,
      comment: req.body.comment,
      email: req.body.email,
      username: req.body.username,
      albumId: req.body.albumId,
    };

    await Rating.create(rating);

    res.redirect(`/album/${req.body.albumId}`);
  },
);

module.exports = router;
