const express = require('express')
const app = express()
const path = require('path')
const morgan = require('morgan')
const mysql = require('mysql2')
const myconnection = require('express-myconnection')

const piaceriRutas = require('./rutas/piacere')

app.set('port', process.env.PORT || 5000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(morgan('dev'))

app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: /*'TDK_jhoitan045'*/ '123456789',
    port: 3306,
    database: 'piaceri'
}, 'single'))

app.use(express.urlencoded({
    extended: false
}))


app.use('/', piaceriRutas)
app.use('/comprar', piaceriRutas)




app.use('/public', express.static(__dirname + '/public'))

app.listen(app.get('port'), () => {
    console.log("Servidor en el puerto 5000")
})