const Rating = require('../models/Rating');
// const Album = require('../models/Album');

const getAverageRating = async (albumId) => {
  const ratings = await Rating.findAll(
    {where: {albumId: albumId}},
  );
  if (!ratings) res.status(404).json('Avaliações não encontradas').end();

  let sum = 0;
  const length = ratings.length;
  for (let i = 0; i < length; i++) {
    sum += ratings[i].getDataValue('value');
  }

  return (sum / length).toFixed(2);
};

module.exports = getAverageRating;
