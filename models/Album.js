const sequelize = require('../database');
const { DataTypes } = require('sequelize');
const Artist = require('./Artist');

const Album = sequelize.define('Albums', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    }

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

    // artistId: {
    //     type: DataTypes.INTEGER,
    //     foreignKey: true,
    //     references: {
    //         model: 'Artist',
    //         key: 'id'
    //     }
    // },
});

Artist.hasMany(Album, {
    foreignKey: 'artistId',
});
Album.belongsTo(Artist);

Album.sync({alter: false, force: false})
  .then(() => console.log('A tabela Albums foi (re)criada'))
  .catch((error) => console.log(error));

module.exports = Album;