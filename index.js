// Requerimos Express como una var constante, no usaremos ES6
const express = require('express');

// Usaremos esta dependencia para que encuentra la BD a conectarse
const mongoose = require('mongoose');

// Agregamos la dependencia que nos ayuda a parsear las reqs
const bodyParser = require('body-parser');

// Dado que el manjeador de rutas está en api.js, lo requerimos
const routes = require('./routes/api');

// El producto se llamará app y desde ahí se inicializará el
// servidor en Express.js, aquí sucede mucha de la magia de
// este framework para Node.js
const app = express();

// Conectándode a mongodb, si no existe la crea
mongoose.connect('mongodb://localhost/blud-bictia', {useNewUrlParser: true});
// Es necesario conectar las promesas de mongoose al objeto global,
// puesto que las promesas de éste están 'deprecated'
mongoose.Promise = global.Promise;

// OJO: Debe ser antes del handle router, usaremos JSON
app.use(bodyParser.json());

// INICIALIZANDO LAS RUTAS
// En aras de la economía de código, siempre usará como primer 
// parámetro en el path del URL la partícula '/api/'
app.use('/api', routes);

// MIDDLEWARE PARA EL MANEJO DE ERRORES
app.use(function(err, req, res, next){
    console.log(err.message);
    res.status(422).send({mostrarError: err.message});
});

// Escuchando las peticiones, escucharemos las peticiones en
// el puerto 4000
app.listen(process.env.port || 4000, function(){
    console.log('Escuchando peticiones...');
});