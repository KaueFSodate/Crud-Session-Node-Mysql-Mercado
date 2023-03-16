const {Sequelize} = require('sequelize');
const db = require("../db/conn");
const usuarios = require('./usuarios');

const {DataTypes} = Sequelize;


const produtos = db.define('produtos',{
    nome: {
       type: DataTypes.STRING,
       allowNull: false,
       require: true
    },
    descricao: {
        type: DataTypes.STRING,
     },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    valor: {
        type: DataTypes.NUMERIC,
        require: true
    }
});

produtos.belongsTo(usuarios)    // Produto pertence a um usuario
usuarios.hasMany(produtos)   // Usuario pode ter varios produtos

module.exports = produtos;