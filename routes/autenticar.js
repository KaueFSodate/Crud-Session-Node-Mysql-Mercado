const express = require('express')
const router = express.Router()
const autenticarController = require('../controllers/autenticarController')



router.get('/login', autenticarController.telaLogin)
router.post('/login', autenticarController.acessar)
router.get('/registro', autenticarController.telaRegistro)
router.post('/registro', autenticarController.cadastrarUsuario)
router.get('/logout', autenticarController.sairUsuario)

module.exports = router;