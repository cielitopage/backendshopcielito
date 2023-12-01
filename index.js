const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');
const path = require('path');


const app = express();


// CORS
app.use( cors() );

const port = process.env.PORT || 3000;
// Lectura y parseo del body
app.use(express.json());
// Directorio publico
app.use(express.static('public'));
// Database
dbConnection();

// Routes
app.use('/api/usuarios', require('./routes/usuarios')); // Ruta para usuarios
app.use('/api/login', require('./routes/auth')); // Ruta para login 
app.use('/api/resetpassword', require('./routes/usuarios')); // Ruta para reset password
app.use('/api/resetpasswordconfirm', require('./routes/usuarios')); // Ruta para reset password confirm
app.use('/api/validate-email', require('./routes/usuarios')); // Ruta para login
app.use('/api/categorias', require('./routes/categorias')); // Ruta para categorias
app.use('/api/productos', require('./routes/productos')); // Ruta para productos
app.use('/api/buscar', require('./routes/busquedas')); // Ruta para busquedas
app.use('/api/uploads', require('./routes/uploads')); // Ruta para busquedas
app.use('/api/articles', require('./routes/article')); // Ruta para busquedas
app.use('/api/comments', require('./routes/comments')); // Ruta para busquedas
app.use('/api/likes', require('./routes/like')); // Ruta para busquedas
app.use('/api/dislikes', require('./routes/dislikes')); // Ruta para busquedas

// Manejar demas rutas

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
}); 



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
);
