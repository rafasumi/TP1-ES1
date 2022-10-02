const sequelize = require('../database');
const {DataTypes} = require('sequelize');
const Artist = require('./Artist');

const Album = sequelize.define('Albums', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Artist.hasMany(Album);
Album.belongsTo(Artist);

Artist.sync({alter: false, force: false})
  .then(() => console.log('A tabela Artists foi (re)criada'))
  .catch((error) => console.log(error));

Album.sync({alter: false, force: false})
  .then(() => console.log('A tabela Albums foi (re)criada'))
  .catch((error) => console.log(error));

module.exports = Album;
