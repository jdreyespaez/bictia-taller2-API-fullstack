// Requerimos Express como una var constante, no usaremos ES6
const express = require('express');
// Usaremos el enrutador de Express, para manejar más fácil 
// las rutas del API
const router = express.Router();

// Creando una nueva instancia del modelo
const Bluder = require('../models/bluder');

// Hacer un GET de la lista de pacientes (bluders) de la BD
router.get('/bluders', function(req, res, next){
    // Una forma de pedir todos los bluders sería
    /* Bluder.find({}).then(function(bluders){
        res.send(bluders);
    }); */
    // Pero queremos pedir aquellos que estén en un rango determinado
    // Vamos a usar URL Params, no req.params.id
    Bluder.aggregate().near({
        near: {
            'type': 'Point',
            // Con parseFloat recibimos los números en el formato adecuado
            'coordinates': [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        // Buscaremos pacientes que estén en un radio de X metros
        // En este caso: 4km
        maxDistance: 4000,
        // Se busca en un círculo
        spherical: true,
        distanceField: "dis"
    })
        // Aquí disparamos una función cuando se complete la query anterior, 
        // mediante una promesa
        .then(function(bluders){
            res.send({
                bludersCercanos: bluders
            });
        })
});

// Agregar un bluder a la BD
router.post('/bluders', function(req, res, next){
    // Podemos usar .body pues aquí está empaquetado lo que nos 
    // envía el body-parser

    // PASO 1: GUARDAR LOS DATOS EN MONGODB
    // Requerimos el módulo que viene del modelo con el Schema
    // aquí se creó la instancia donde se usan los datos que vienen
    // en el req.body
    // var bluder = new Bluder(req.body);

    // PASO 2: GUARDAR LOS DATOS EN MONGODB
    // Usando un método propio de mongoose se guarda en la colección
    // 'bluder', tal como se definió en index.js:
    // const Bluder = mongoose.model('bluder', BluderSchema);
    // bluder.save();

    // PASO 1 + PASO 2: En vez de crear una instancia y después
    // guardarla por separado. Se puede resumir así en el modelo:
    //      PROMESA ADECUADA, una buena práctica es enviar los datos
    //      que el usuario nos mandó y eso lo hacemos con una promesa.
    //      Primero debe cumplir lo que viene en la promesa y después
    //      sí nos muestra lo que se guardó
    Bluder.create(req.body).then(function(bluder){
        // Regresaremos lo que se guardó en la DB
        res.send(bluder);
    }).catch(next);

});

// Actualizar un bluder en la BD
// se dirige a un end-point con id único
router.put('/bluders/:id', function(req, res, next){
    // Lo que hace el método findOneAndUpdate es actualizar en el segundo parámetro
    // lo que venga en el body
    Bluder.findOneAndUpdate({_id: req.params.id}, req.body)
        // Una vez se complete el método, se ejecutará la siguiente función
        .then(function(){
            // OJO: si ponemos el parámetro bluder, nos mostrará el dato antiguo
            // tendremos pues que buscar el nuevo dato
            Bluder.findOne({_id: req.params.id}).then(function(bluder){
                res.send({
                    bluderActualizado: bluder
                });
            });
        });
});

// Eliminar un bluder de la BD
// se dirige a un end-point con id único, nos referimos a un parámetro de la ruta
router.delete('/bluders/:id', function(req, res, next){
    // Dado que es un parámetro se puede pedir a .params.id
    // Usaremos el métido de mongoose .findByIdAndRemove(), lo buscamos en mongo como
    // _id: req.params.id
    Bluder.findOneAndDelete({_id: req.params.id})
        // La promesa que se muestra únicamente cuando borró el elmemento nos
        // responde con el objeto eliminado
        .then(function(bluder){
            res.send({
                bluderEliminado: bluder
            });
        });
});

// Estas rutas deben ser manejadas desde la app en su index.js
module.exports = router;