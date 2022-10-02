const sequelize = require('../database');
const {DataTypes} = require('sequelize');
const Album = require('./Album');

const Rating = sequelize.define('Ratings', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

Album.hasMany(Rating);
Rating.belongsTo(Album);

Rating.sync({alter: false, force: false})
  .then(() => console.log('A tabela Ratings foi (re)criada'))
  .catch((error) => console.log(error));

module.exports = Rating;
