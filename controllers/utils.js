const getAverageArtistRating = (albums) => {
  let sum = 0;
  albums.forEach((album) => {
    sum += parseFloat(album.getDataValue('avgAlbumRating'));
  });
  return (sum / albums.length).toFixed(1);
};

module.exports = {getAverageArtistRating};
