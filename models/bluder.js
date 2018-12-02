// Pedismo mongoose y los Schemas que vienen de esa dependencia
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Se crea el Schema para la ubicación geográfica
const GeoSchema = new Schema({
    type: {
        type: String,
        default: "Point"
    },
    coordinates: {
        type: [Number],
        // MongoDB usará la ubicación como el mundo y su curvatura
        index: "2dsphere"
    }
});

// Se crea el modelo y Schema para los bluders
const BluderSchema = new Schema({
    // Información básica del BLUDER
    nombre: {
        type: String,
        required: [true, 'El campo Nombre es obligatorio']
    },
    diagnostico: {
        type: String,
        required: [true, 'El campo Diagnóstico es obligatorio']
    },
    disponible: {
        type: Boolean,
        default: false
    },
    // Ubicación geográfica del bluder
    // Por organización llamará este Schema del GeoSchema
    // Esta propiedad 'geometry' es propia de geojson.org
    geometry: GeoSchema

});

// CREANDO LOS MODELOS EN MONGODB
// Sintaxis: 
//      const NombreModelo = mongoose.model(
//          'nombreColeccion',
//          NombreSchema
//      );
// Nota: la colección después de pluraliza
const Bluder = mongoose.model('bluder', BluderSchema);

// Después lo exportamos para otros archivos
module.exports = Bluder;