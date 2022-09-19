const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const Artist = sequelize.define('Artists', {
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

    musicalGender: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Artist.sync({alter: false, force: false})
  .then(() => console.log('A tabela Artists foi (re)criada'))
  .catch((error) => console.log(error));

module.exports = Artist;