const express = require('express');
const path = require('path');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

//CORS 
app.use(cors());

// Directorio Público
app.use(express.static('public'));

// Lectura y parseo de body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.use('*', (req, res) => {
    res.sendFile(path.join( __dirname, 'public/index.html'));
})



// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});