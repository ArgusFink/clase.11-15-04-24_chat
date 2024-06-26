// <<< Ver anotaciones previas de clase en cuarderno.
// aprox. 29' 30'' Se trata SWEET ALERT


// ************** ACORTAR EXT. HANDLEBARS ******************
// 1º 17' 1asdx


// ************** CAMBIA LA VERSIÓN DE HANDLEBARS ...
// ... EXPRESS x FALLAS ******************
// 1º 19' 50' 2asdx


// ************** GLITCH ******************
// 1º 22' 30'' 3asdx
// 1º 31' Importante no tener hardcodeado el puerto 4asdx
// 1º 33' En el PACKAGE.JSON tener definico oblig. el START
// 1º 41' 30'' Glitch NO reconoce IMPORT <> FROM..
// ... y hace el reemplazo de TYPES MODULE a REQUIRE


const express = require('express')
//import express from 'express'

// import usersRouter from './routes/users.router.js'
// import productsRouter from './routes/products.router.js'
const  viewsRouter = require('./routes/views.router.js')
//import viewsRouter from './routes/views.router.js'
// import { __dirname } from './utils.js'
// import { uploader } from './multer.js'
// motor de plantilla
const  handlebars = require('express-handlebars')
const  { productsSocket } = require('./utils/productsSocket.js')
// socket io
const  { Server } = require('socket.io')

const app = express()

// Guardar en una cont
// 4asdx
const PORT = process.env.PORT || 8080

// 4asdx
const httpServer = app.listen(PORT, error => {
    if(error) console.log(error)
    console.log('Server escuchando en el puerto 8080')
})
// creamos el socket server
const io = new Server(httpServer)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname+'/public'))

// 1asdx
// express usa este motor de plantillas
app.engine('hbs', handlebars.engine({
    // 1asdx
    extname: '.hbs'
}))
// seteamos la dirección de mis vistas (plantlillas)
app.set('views', __dirname+'/views')
// 1asdx
app.set('view engine', 'hbs')

//middleware
// app.use(productsSocket(io))


// app.use('/subir-archivo', uploader.single('myFile') ,(req, res) => {
//     if (!req.file) {
//         return res.send('no se puede subir el archivo')        
//     }

//     res.send('archivo subido')
// })

app.use('/', viewsRouter)

// app.use('/api/users', usersRouter)

// app.use('/api/products', productsRouter)

app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send('Error 500 en el server')
})

let messages = [] // simular un db mock 
// manager chat - productos 
// socketServer -> io 
io.on('connection', socket => {
    console.log('Cliente conectado')

    socket.on('message', data => {
        console.log('message data: ', data)
        // guardamos los mensajes
        messages.push(data)
        // emitimos los mensajes
        io.emit('messageLogs', messages)
    })
})


// 