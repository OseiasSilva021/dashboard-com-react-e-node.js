const express = require('express');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const Task = require('../models/Tasks');
const bcrypt = require('bcrypt')
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { createUser, loginUser, getAllUsers, deleteUser, updateUser, getUserProfile, updateProfileImage, forgotPassword, resetPassword, loginRateLimiter } = require('../controllers/userController');
const { validateUser } = require('../middleware/validateMiddleware');
const authenticateToken = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');
const upload = require('../config/upload'); 
const User = require('../models/User');

const router = express.Router();


const products = [
  {
    title: 'Robo Insano',
    photo: 'https://cdn.pixabay.com/photo/2024/06/01/14/00/ai-8802304_1280.jpg',
    price: 285,
    salesPrice: 375,
    rating: 4,
  },
  {
    title: 'Panda Ciclista',
    photo: 'https://s2-techtudo.glbimg.com/L9wb1xt7tjjL-Ocvos-Ju0tVmfc=/0x0:1200x800/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/q/l/TIdfl2SA6J16XZAy56Mw/canvaai.png',
    price: 900,
    salesPrice: 650,
    rating: 5,
  },
  {
    title: 'Geradores de IA',
    photo: 'https://piktochart.com/wp-content/uploads/2023/10/14-melhores-geradores-de-imagem-IA-em-2024-opcoes-gratuitas-e-pagas.png',
    price: 150,
    salesPrice: 200,
    rating: 3,
  },
  {
    title: 'Praia de Copacabana',
    photo: 'https://www.guiaviagensbrasil.com/imagens/Imagem%20do%20mar%20calma%20e%20belo%20da%20Praia%20da%20Engenhoca-Itacar%C3%A9-Bahia-BA.jpg',
    price: 345,
    salesPrice: 285,
    rating: 2,
  },
];

const transactions = [
    { time: "09:30 am", 
      description: "Pagamento recebido de John Doe no valor de R$385,90", 
      type: "pagamento" },

    { time: "10:00 am", 
      description: "Nova venda registrada", 
      type: "venda", "link": "#ML-3467" },

    { time: "12:00 am", 
      description: "Pagamento realizado no valor de R$64,95 para Michael", 
      type: "pagamento" },

    { time: "09:30 am", 
      description: "Nova venda registrada", 
      type: "venda", "link": "#ML-3467" },

    { time: "09:30 am", 
      description: "Novo item registrado", 
      type: "chegada" },

    { time: "12:00 am", 
      description: "Pagamento recebido", 
      type: "pagamento" }
]

const productsList = [
    {
        id: "1",
        name: "Oséias da Silva Santos",
        post: "Web Designer",
        pname: "Elite da Elite",
        priority: "Low",
        pbg: "primary.main",
        budget: "3.9",
    },
    {
        id: "2",
        name: "Marcelo Rossi",
        post: "Gerente de Projetos",
        pname: "Tema Real Homes WP",
        priority: "Média",
        pbg: "secondary.main",
        budget: "24.5",
    },
    {
        id: "3",
        name: "Zé da Borracha",
        post: "Gerente de Projetos",
        pname: "Tema MedicalPro WP",
        priority: "Alta",
        pbg: "error.main",
        budget: "12.8",
    },
    {
        id: "4",
        name: "Joana Clementina",
        post: "Engenheira Frontend",
        pname: "Hosting Press HTML",
        priority: "Crítica",
        pbg: "success.main",
        budget: "2.4",
    },
];

const breakup =
{
  increase: 9,
  total: 36358,
  lastYearData: ["2022", "2023"],
  series: [38, 40, 25]
}

const monthlyEarnings = {
  earnings: 6820,
  increase: 9,
  series: [25, 66, 20, 40, 12, 58, 20]
}
  // Exemplo de dados dinâmicos por mês
  const salesData = {
    '1': {
        dates: ['01/03', '02/03', '03/03'],
        earnings: [1000, 2000, 1500],
        expenses: [500, 700, 400],
    },
    '2': {
        dates: ['01/04', '02/04', '03/04'],
        earnings: [1200, 1800, 1700],
        expenses: [600, 800, 500],
    },
    '3': {
        dates: ['01/05', '02/05', '03/05'],
        earnings: [1300, 1900, 1600],
        expenses: [700, 900, 600],
    },
};

const notifications = [
  {
    id: 1,
    title: 'Nova mensagem',
    subtitle: 'Você tem uma nova mensagem de Maria, responda-a!',
    avatar: 'https://via.placeholder.com/40',
  },
  {
    id: 2,
    title: 'Atualização de sistema',
    subtitle: 'O sistema foi atualizado com sucesso, aproveite as melhorias!',
    avatar: 'https://via.placeholder.com/40',
  },
];

const apps = [
  {
    id: 1,
    title: 'Aplicativo de Tarefas',
    subtext: 'Gerencie suas tarefas diárias, por favor.',
    href: '/tasks-app',
  },
  {
    id: 2,
    title: 'Calendário',
    subtext: 'Confira seus eventos aqui!',
    href: '/calendar',
  },
];

router.get('/api/apps', (req, res) => {
  res.json(apps);
});

router.get('/api/notifications', (req, res) => {
  res.json(notifications);
});

router.get('/api/breakup', (req, res) => {
  res.json(breakup);
});

router.get('/api/monthly-earnings', (req, res) => {
  res.json(monthlyEarnings);
});

  
// Exemplo de rota no Express
router.get('/api/sales/:month', (req, res) => {
  const month = req.params.month;
  res.json(salesData[month] || {}); // Retorna os dados para o mês
});


  router.get('/api/products', (req, res) => {
    res.json(productsList);
  });

// rota pra retornar as transações
router.get('/transactions', (req, res) => {
  res.json(transactions);
});

// Rota para retornar os produtos
router.get('/products', (req, res) => {
  res.json(products);
});

// Rota de registro de usuário com validação de dados
router.post('/register', validateUser, createUser);

// Rota de login de usuário
router.post('/login', loginRateLimiter, loginUser); 

// Rota para obter todos os usuários
router.get('/users', getAllUsers); 

// Rota para obter o perfil do usuário autenticado
router.get('/users/profile', authenticateToken, getUserProfile); 

// Rota para atualizar o perfil do usuário autenticado
router.put('/users/profile', authenticateToken, updateUser); // Agora, usa /profile

// Rota para deletar um usuário pelo ID
router.delete('/users/:id', deleteUser);

// Rota para upload de imagem de perfil (utilizando o multer)
router.put('/users/profile-image', authenticateToken, upload.single('profileImage'), updateProfileImage);




  
  
  module.exports = router;
