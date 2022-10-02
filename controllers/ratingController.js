const Rating = require('../models/Rating');
const router = require('express').Router();

router.post('/createRating',
  async (req, res) => {
    const rating = {
      value: req.body.value,
      comment: req.body.comment,
      email: req.body.email,
    };

    await Rating.create(rating);

    res.status(201).end();
  });

router.get('/getRatings',
  async (req, res) => {
    const ratings = await Rating.findAll();
    res.status(200).json(ratings);
  });

router.put('/updateRating/:id',
  async (req, res) => {
    const rating = await Rating.findByPk(req.params.id);
    await rating.update(req.body);
    res.status(200).end();
  });

router.delete('/deleteRating/:id',
  async (req, res) => {
    const rating = await Rating.findByPk(req.params.id);
    await rating.destroy();
    res.status(200).end();
  });

module.exports = router;
