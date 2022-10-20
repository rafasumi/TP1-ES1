const Rating = require('../models/Rating');
const router = require('express').Router();
const ratingValidate = require('../middlewares/ratingValidator');
const objectFilter = require('../middlewares/objectFilter');

router.post('/createRating',
  objectFilter(['body'], ['value', 'comment', 'email']),
  ratingValidate('create'),
  async (req, res) => {
    const rating = {
      value: req.body.value,
      comment: req.body.comment,
      email: req.body.email,
    };

    await Rating.create(rating);

    res.status(201).end();
  },
);

router.get('/getRatings',
  async (req, res) => {
    const ratings = await Rating.findAll();
    if (!ratings) res.status(404).json('Avaliações não encontradas').end();
    else res.status(200).json(ratings);
  },
);

router.put('/updateRating/:id',
  objectFilter(['body'], ['value', 'comment', 'email']),
  ratingValidate('updateRating'),
  async (req, res) => {
    const rating = await Rating.findByPk(req.params.id);
    if (!rating) res.status(404).json('Avaliação não encontrada').end();
    else {
      await rating.update(req.body);
      res.status(200).end();
    }
  },
);

router.delete('/deleteRating/:id',
  async (req, res) => {
    const rating = await Rating.findByPk(req.params.id);
    if (!rating) res.status(404).json('Avaliação não encontrada').end();
    else {
      await rating.destroy();
      res.status(200).end();
    }
  },
);

module.exports = router;
