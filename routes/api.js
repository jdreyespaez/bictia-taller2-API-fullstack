// Requerimos Express como una var constante, no usaremos ES6
const express = require('express');
// Usaremos el enrutador de Express, para manejar más fácil 
// las rutas del API
const router = express.Router();

// Hacer un GET de la lista de pacientes (bluders) de la BD
router.get('/bluders', function(req, res){
    res.send({type: 'GET'});
});

// Agregar un bluder a la BD
router.post('/bluders', function(req, res){
    // Podemos usar .body pues aquí está empaquetado lo que nos 
    // envía el body-parser
    console.log(req.body);
    res.send({type: 'POST'});
});

// Actualizar un bluder en la BD
// se dirige a un end-point con id único
router.put('/bluders/:id', function(req, res){
    res.send({type: 'PUT'});
});

// Eliminar un bluder de la BD
// se dirige a un end-point con id único
router.delete('/bluders/:id', function(req, res){
    res.send({type: 'DELETE'});
});

// Estas rutas deben ser manejadas desde la app en su index.js
module.exports = router;