const {Sequelize} = require('sequelize');

// Configuração do Sequelize para banco de dados SQLite
const sequelize = new Sequelize({
  storage: './database.sqlite',
  dialect: 'sqlite',
});

module.exports = sequelize;