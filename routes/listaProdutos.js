const express = require('express')
const router = express.Router()
const produtoController = require('../controllers/produtoController')

//  Helpers

const autenticar = require('../helpers/autenticar').autenticar

router.get('/produtos', autenticar, produtoController.telaProdutos)
router.get('/editar/:id', autenticar, produtoController.telaEditar)
router.post('/cadastrarP', autenticar, produtoController.cadastrarProdutos)
router.get('/deletar/:id', autenticar, produtoController.deletarProdutos)
router.post('/editar', autenticar, produtoController.editarProdutos)

module.exports = router;