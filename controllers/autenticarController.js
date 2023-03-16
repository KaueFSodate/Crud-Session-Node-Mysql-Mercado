const { where } = require("sequelize");
const usuarios = require("../models/usuarios");
const bcrypt = require('bcrypt')

module.exports = class produtoController{

    static telaLogin = async(req, res) =>{
        res.render('login');
    }

    // Logar com usuário
    static acessar = async(req, res) =>{
        const {email, senha} = req.body

        const Usuario = await usuarios.findOne({where: {email: email}})
        const senhaUser = bcrypt.compareSync(senha, Usuario.senha)

        if(!Usuario){ // Se não possuir email no banco
            console.log("E-mail incorreto")
            res.redirect('/login'); // Redirecionar para a tela de login
        
            return
        }
        
        if(!senhaUser){
            console.log("Senha incorreta")
            res.redirect('/login'); // Redirecionar para a tela de login

            return
        }

        // Inicializar session
        req.session.usuariosid = Usuario.id
        console.log('Bem vindo');

        req.session.save(() => {
            res.redirect('/produtos'); // Redirecionar para a tela de registro
        })


    }

    static telaRegistro = async(req, res) =>{
        res.render('registro');
    }

    static cadastrarUsuario = async(req, res) =>{
        const {nome, email, senha, confirmasenha} = req.body;

        // Verificar se a senha foi digitada corretamente
        if(senha != confirmasenha){
            console.log('Senhas não conferem!');
            res.redirect('/registro'); // Redirecionar para a tela de registro

            return
        }

        // Verificar se já existe usuario
        const checarUsuario = await usuarios.findOne({where: {email: email}});

        if(checarUsuario){
            console.log('Usuario já existe');
            res.redirect('/registro'); // Redirecionar para a tela de registro

            return
        }

        // Criação de senha  criptografada
        const salt = bcrypt.genSaltSync(10);    // Senha no mínimo 10 caracteres
        const senhaCriptografada = bcrypt.hashSync(senha, salt)

        const usuario = {
            nome,
            email,
            senha: senhaCriptografada
        }

        // Cadastrar usuario
        try {
            const usuarioCriado = await usuarios.create(usuario);

            // Inicializar session
            req.session.usuariosid = usuarioCriado.id
            console.log('Bem vindo');

            req.session.save(() => {
                res.redirect('/produtos'); // Redirecionar para a tela de registro
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Sair da session
    static sairUsuario = async(req, res) =>{
        req.session.destroy()
        res.redirect('/login'); // Redirecionar para a tela de login

    }

}