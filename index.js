const express = require('express');
// Usaremos esta dependencia para que encuentra la BD a conectarse
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes/api');
const app = express();

// Conectándode a mongodb, si no existe la crea
mongoose.connect('mongodb://localhost/salas', {useNewUrlParser: true});
// Es necesario conectar las promesas de mongoose al objeto global,
// puesto que las promesas de éste están 'deprecated'
mongoose.Promise = global.Promise;

// Un MIDDLEWARE para servir los archivos estáticos
// Usando Express.js vamos a buscar en 'public' los archivos que estén ahí
app.use(express.static('public'));

// OJO: Debe ser antes del handle router, usaremos JSON
app.use(bodyParser.json());

// INICIALIZANDO LAS RUTAS
app.use('/api', routes);

// MIDDLEWARE PARA EL MANEJO DE ERRORES
app.use(function(err, req, res, next){
    console.log(err.message);
    res.status(422).send({mostrarError: err.message});
});

app.listen(process.env.port || 8000, function(){
    console.log('Escuchando peticiones...');
});

function Average(a, b){
    return (a + b) / 2;
}

console.log(average(20, 10));