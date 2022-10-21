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
    // unique: true,
    // com unique: true, o sequelize não permite que um mesmo email seja
    // usado para avaliar mais de um álbum
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Album.hasMany(Rating, {foreignKey: 'albumId'});
Rating.belongsTo(Album, {foreignKey: 'albumId', onDelete: 'CASCADE'});

Rating.sync({alter: false, force: false})
  .then(() => console.log('A tabela Ratings foi (re)criada'))
  .catch((error) => console.log(error));

module.exports = Rating;
