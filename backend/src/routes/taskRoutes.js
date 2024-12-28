const express = require('express');
const router = express.Router();
const Task = require('../models/Tasks'); // Modelo de tarefa
const authenticateToken = require('../middleware/authMiddleware'); // Middleware de autenticação

// Middleware global para garantir autenticação
router.use(authenticateToken);

// Rota GET: Buscar todas as tarefas do usuário autenticado
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }); // Busca tarefas do usuário logado
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefas', error });
  }
});

// Rota POST: Criar uma nova tarefa
router.post('/tasks', async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'O título da tarefa é obrigatório' });
  }

  try {
    const task = new Task({
      title,
      userId: req.user.id, // Obtém o userId do token decodificado
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar tarefa', error });
  }
});

// Rota PATCH: Atualizar o estado de uma tarefa (ex.: marcar como concluída)
router.patch('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  try {
    const task = await Task.findOne({ _id: id, userId: req.user.id }); // Certifica-se de que a tarefa pertence ao usuário
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    task.completed = completed !== undefined ? completed : task.completed;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar a tarefa', error });
  }
});

// Rota PUT: Editar uma tarefa (ex.: título ou estado de conclusão)
router.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  if (!title && completed === undefined) {
    return res.status(400).json({ message: 'É necessário fornecer ao menos um campo para atualização.' });
  }

  try {
    const task = await Task.findOne({ _id: id, userId: req.user.id }); // Certifica-se de que a tarefa pertence ao usuário
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }

    // Atualiza apenas os campos fornecidos
    if (title) task.title = title;
    if (completed !== undefined) task.completed = completed;

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao editar a tarefa', error });
  }
});

// Rota DELETE: Excluir uma tarefa
router.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir a tarefa', error });
  }
});

module.exports = router;
