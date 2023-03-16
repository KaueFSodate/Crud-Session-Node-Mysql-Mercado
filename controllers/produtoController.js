const produtos = require("../models/produto");
const usuarios = require('../models/usuarios')


module.exports = class produtoController{

    static telaProdutos = async(req, res) =>{
        const usuarioId = req.session.usuariosid

        const user = await usuarios.findOne({
            where: {
                id: usuarioId,
            },
            include: produtos,

            plain: true,
        })

        const produto = user.produtos.map((result) => result.dataValues)
        console.log(produto)

        res.render('produtos', {produto});
    }

    static cadastrarProdutos = async(req, res) =>{
        
        const produto = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            tipo: req.body.tipo,
            valor: req.body.valor,
            usuarioId : req.session.usuariosid
        }

        try {
            await produtos.create(produto)
            console.log("Produto cadastrado com sucesso!")

            req.session.save(() => {
                res.redirect('/produtos'); // Redirecionar para a tela de registro
            })

        } catch (error) {
            console.log(error)
        }

    }

    static deletarProdutos = async(req, res) =>{
        
        const id = req.params.id
        const usuarioId = req.session.usuariosid
        

        try {
            await produtos.destroy({where: {id : id, usuarioId: usuarioId}})
            console.log("Produto deletado com sucesso!")

            req.session.save(() => {
                res.redirect('/produtos'); // Redirecionar para a tela de registro
            })

        } catch (error) {
            console.log(error)
        }

    }

    static telaEditar = async(req, res) =>{
        
        const id = req.params.id

        const produto = await produtos.findOne({where: {id: id}, raw: true})

        res.render('editar', {produto});

        
    }

    static editarProdutos = async(req, res) =>{
        
        const id = req.body.id

        const produto = {
            nome: req.body.nome,
            descricao: req.body.descricao,
            tipo: req.body.tipo,
            valor: req.body.valor,
        }

        try {
            await produtos.update(produto, {where: {id: id}})
            console.log("Produto cadastrado com sucesso!")

            req.session.save(() => {
                res.redirect('/produtos'); // Redirecionar para a tela de registro
            })

        } catch (error) {
            console.log(error)
        }

    }

}