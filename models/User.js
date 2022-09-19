const sequelize = require('../database');
const { DataTypes } = require('sequelize');

const User = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    }

    email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
});

User.sync({alter: false, force: false})
  .then(() => console.log('A tabela Users foi (re)criada'))
  .catch((error) => console.log(error));

module.exports = User;