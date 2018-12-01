// Requerimos Express como una var constante, no usaremos ES6
const express = require('express');

// El producto se llamará app y desde ahí se inicializará el
// servidor en Express.js, aquí sucede mucha de la magia de
// este framework para Node.js
const app = express();

// Escuchando las peticiones, escucharemos las peticiones en
// el puerto 4000
app.listen(process.env.port || 4000, function(){
    console.log('Escuchando peticiones...');
});