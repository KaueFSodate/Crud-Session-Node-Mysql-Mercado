const {Sequelize} = require('sequelize')

const db = new Sequelize('olx','root','bnd43qhq',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = db;