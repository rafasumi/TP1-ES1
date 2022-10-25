const getAverageArtistRating = (albums) => {
  let sum = 0;
  albums.forEach((album) => {
    console.log(parseFloat(album.getDataValue('avgAlbumRating')));
    console.log(album.getDataValue('avgAlbumRating'));
    sum += parseFloat(album.getDataValue('avgAlbumRating'));
  });
  return (sum / albums.length).toFixed(1);
};

module.exports = {getAverageArtistRating};
