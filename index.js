// Requerimos Express como una var constante, no usaremos ES6
const express = require('express');

// Dado que el manjeador de rutas está en api.js, lo requerimos
const routes = require('./routes/api');

// Agregamos la dependencia que nos ayuda a parsear las reqs
const bodyParser = require('body-parser');

// El producto se llamará app y desde ahí se inicializará el
// servidor en Express.js, aquí sucede mucha de la magia de
// este framework para Node.js
const app = express();

// OJO: Debe ser antes del handle router, usaremos JSON
app.use(bodyParser.json())

// INICIALIZANDO LAS RUTAS
// En aras de la economía de código, siempre usará como primer 
// parámetro en el path del URL la partícula '/api/'
app.use('/api', routes);

// Escuchando las peticiones, escucharemos las peticiones en
// el puerto 4000
app.listen(process.env.port || 4000, function(){
    console.log('Escuchando peticiones...');
});