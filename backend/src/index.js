const express = require('express');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const taskRoutes = require('./routes/taskRoutes')
const connectDB = require('./config/db');
require('dotenv').config();


const app = express();

app.use(express.static(path.join(__dirname, '../uploads/')));



// Conectar ao MongoDB
connectDB();

// Configurações de middleware
app.use(cors());
app.use(express.json());

// Serve arquivos estáticos da pasta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, '../uploads/')));

// Rotas
app.use(userRoutes); // Adiciona as rotas de usuários
app.use(taskRoutes); // Adiciona as rotas de posts
app.use(postRoutes); // Adiciona as rotas de tasks

// Iniciar servidor
app.listen(3000, () => {
  console.log('API rodando na porta 3000');
});
