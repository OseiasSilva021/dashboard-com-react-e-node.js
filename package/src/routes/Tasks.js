import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  TextField,
  Checkbox,
  Stack,
} from '@mui/material';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar as tarefas da API
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/tasks', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Inclui o token de autenticação
          },
        });
        if (!response.ok) throw new Error('Erro ao buscar as tarefas');
        const tasksData = await response.json();
        setTasks(tasksData);
      } catch (error) {
        console.error('Erro ao buscar as tarefas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!newTask.trim()) return; // Evita adicionar tarefas vazias
    try {
      const response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title: newTask }),
      });
      if (!response.ok) throw new Error('Erro ao adicionar a tarefa');
      const createdTask = await response.json();
      setTasks([...tasks, createdTask]); // Adiciona a nova tarefa à lista
      setNewTask(''); // Limpa o campo de texto
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ completed: true }),
      });
      if (!response.ok) throw new Error('Erro ao marcar a tarefa como concluída');
      setTasks(tasks.map(task => (task.id === taskId ? { ...task, completed: true } : task)));
    } catch (error) {
      console.error('Erro ao concluir a tarefa:', error);
    }
  };

  if (loading) {
    return <Typography variant="h6">Carregando tarefas...</Typography>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      {/* Título da Página */}
      <Typography variant="h4" fontWeight="700" gutterBottom>
        Minhas Tarefas
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" mb={4}>
        Gerencie suas tarefas diárias.
      </Typography>

      {/* Adicionar Nova Tarefa */}
      <Card sx={{ mb: 4, padding: 2 }}>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          Adicionar Nova Tarefa
        </Typography>
        <Stack direction="row" spacing={2}>
          <TextField
            variant="outlined"
            fullWidth
            placeholder="Digite a nova tarefa"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleAddTask}>
            Adicionar
          </Button>
        </Stack>
      </Card>

      {/* Lista de Tarefas */}
      <Typography variant="h6" fontWeight="600" gutterBottom>
        Lista de Tarefas
      </Typography>
      <Card>
        <List>
          {tasks.map((task, index) => (
            <React.Fragment key={task.id}>
              <ListItem
                secondaryAction={
                  <Checkbox
                    edge="end"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task.id)}
                    disabled={task.completed} // Desabilita o checkbox se a tarefa já estiver concluída
                  />
                }
              >
                <ListItemText
                  primary={task.title}
                  secondary={task.completed ? 'Concluída' : 'Pendente'}
                />
              </ListItem>
              {index < tasks.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Card>
    </Box>
  );
};

export default Tasks;
