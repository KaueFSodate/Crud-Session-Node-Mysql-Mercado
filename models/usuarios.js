const {Sequelize} = require('sequelize');
const db = require("../db/conn");

const {DataTypes} = Sequelize;


const usuarios = db.define('usuarios',{
    nome: {
       type: DataTypes.STRING,
       allowNull: false,
       require: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
});

module.exports = usuarios;