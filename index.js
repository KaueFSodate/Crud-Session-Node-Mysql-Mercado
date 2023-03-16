const express = require('express')
const cors = require('cors')
const handlebars = require('express-handlebars')
const session = require('express-session')
const fileStore = require('session-file-store')(session)
const flash = require('express-flash')
const conn = require('./db/conn')
const port = 5000

const produtoRoutes = require('./routes/listaProdutos')
const autenticarRoutes = require('./routes/autenticar')

const app = express()
// Configuração para acessar o handlebars
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');

app.use(express.static('public')); // Linkar o css

// Pegar as informações do body
app.use(express.urlencoded({
    extended: true

    })
)

// Models

const usuarios = require('./models/usuarios')
const produto = require('./models/produto')

// Session
app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new fileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir())
        }),
        cookie: {
            secure: false,
            maxAge: 360000, // 1 dia
            expires: new Date(Date.now() + 360000),
            httpOnly: true
        }
    }),
)

// Setar session
app.use((req, res, next) => {
    if(req.session.usuariosid){
        res.locals.session = req.session

    }
    next()
})

app.use(express.json())
app.use(cors())
app.use(flash())

app.use('/', produtoRoutes)
app.use('/', autenticarRoutes)

conn.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server rodando na porta ${port}`)
    })
}).catch((error) => {console.log(error)})