const express = require('express');
const app = express();
const PORT = 8080;
const { Contenedor } = require('./Contenedor.js');
const { Productos } = require('./Productos.js');

// Test 
const contenedor = new Contenedor(`productos`);                    // Ingreso nombre del arhcivo

const producto1 = new Productos(`Escuadra`, 123.45, `https://escuadra.com`);   // Creando producto 1
const producto2 = new Productos(`Calculadora`, 234.56, `https://Calculadora.com`);         // Creando producto 2
const producto3 = new Productos(`Globo Terraqueo`, 345.67, `https://Globo-Terraqueo.com`);         // Creando producto 3


arregloDePoductos = [producto1, producto2, producto3];

posicionAlAzar = contenedor.alAzar(arregloDePoductos);
console.log(posicionAlAzar);


const server = app.listen(PORT, () => {
    console.log("servidor iniciado");
});


app.get("/productos", (req, resp) => {
    resp.json(arregloDePoductos);

});


app.get("/productosRandom", (req, resp) => {
    resp.json(arregloDePoductos[posicionAlAzar]);
});
