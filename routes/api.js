const express = require('express');
const router = express.Router();

const Sala = require('../models/sala');

// Hacer un GET de la lista de salas de cine de la BD
router.get('/salas', function(req, res, next){
    // Una forma de pedir todas las salas sería
    Sala.find({}).then(function(salas){
        res.send(salas);
    });
});

// Agregar una sala a la BD
router.post('/salas', function(req, res, next){
    // Podemos usar .body pues aquí está empaquetado lo que nos 
    // envía el body-parser

    // PASO 1: GUARDAR LOS DATOS EN MONGODB
    // Requerimos el módulo que viene del modelo con el Schema
    // aquí se creó la instancia donde se usan los datos que vienen
    // en el req.body
    // var sala = new Sala(req.body);

    // PASO 2: GUARDAR LOS DATOS EN MONGODB
    // Usando un método propio de mongoose se guarda en la colección
    // 'sala', tal como se definió en index.js:
    // const Sala = mongoose.model('sala', SalaSchema);
    // sala.save();

    // PASO 1 + PASO 2: En vez de crear una instancia y después
    // guardarla por separado. Se puede resumir así en el modelo:
    //      PROMESA ADECUADA, una buena práctica es enviar los datos
    //      que el usuario nos mandó y eso lo hacemos con una promesa.
    //      Primero debe cumplir lo que viene en la promesa y después
    //      sí nos muestra lo que se guardó
    Sala.create(req.body).then(function(sala){
        // Regresaremos lo que se guardó en la DB
        res.send(sala);
    }).catch(next);

});


// Estas rutas deben ser manejadas desde la app en su index.js
module.exports = router;