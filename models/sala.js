// Pedismo mongoose y los Schemas que vienen de esa dependencia
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Se crea el modelo y Schema para las salas


const SalaSchema = new Schema({
    direccion: {
        lat:Number, 
        lng:Number,
        localidad: String,
        barrio: String
    },
    salas: {
        type: Number
    },
    peliculas: [{
        nombre: String, 
        idioma: String, 
        estrellas: Number
    }],
    nombre: {
        type: String
    }
});




// CREANDO LOS MODELOS EN MONGODB
// Sintaxis: 
//      const NombreModelo = mongoose.model(
//          'nombreColeccion',
//          NombreSchema
//      );
// Nota: la colección después de pluraliza
const Sala = mongoose.model('sala', SalaSchema);

// Después lo exportamos para otros archivos
module.exports = Sala;