import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  IconButton,
  Stack,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const API_URL = 'http://localhost:3000/tasks';

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
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

    const token = localStorage.getItem('token'); // Obtém o token do localStorage
    if (!token) {
      navigate('/auth/login'); // Redireciona para a página de login se não estiver logado
    }
  }, [navigate]);

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    setIsUpdating(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title: newTask }),
      });
      if (!response.ok) throw new Error('Erro ao adicionar a tarefa');
      const createdTask = await response.json();
      setTasks([...tasks, createdTask]);
      setNewTask('');
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ completed: true }),
      });
      if (!response.ok) throw new Error('Erro ao concluir a tarefa');
      setTasks(tasks.map((task) => (task._id === taskId ? { ...task, completed: true } : task)));
    } catch (error) {
      console.error('Erro ao concluir a tarefa:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!response.ok) throw new Error('Erro ao excluir a tarefa');
      setTasks(tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
    }
  };

  const handleEditTask = async () => {
    if (!editTask.title.trim()) return;
    setIsUpdating(true);
    try {
      const response = await fetch(`${API_URL}/${editTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ title: editTask.title }),
      });
      if (!response.ok) throw new Error('Erro ao editar a tarefa');
      const updatedTask = await response.json();
      setTasks(tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task)));
      setEditTask(null);
    } catch (error) {
      console.error('Erro ao editar tarefa:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return <Typography variant="h6">Carregando tarefas...</Typography>;
  }

  const completedTasksCount = tasks.filter((task) => task.completed).length;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" fontWeight="700" gutterBottom>
        Minhas Tarefas
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" mb={2}>
        Gerencie suas tarefas diárias.
      </Typography>
      <Typography variant="subtitle1" color="primary" mb={4}>
        {`Tarefas concluídas: ${completedTasksCount} de ${tasks.length}`}
      </Typography>

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
            disabled={isUpdating}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTask}
            disabled={isUpdating}
          >
            {isUpdating ? <CircularProgress size={24} color="inherit" /> : 'Adicionar'}
          </Button>
        </Stack>
      </Card>

      <Typography variant="h6" fontWeight="600" gutterBottom>
        Lista de Tarefas
      </Typography>
      <Card>
        <List>
          {tasks.map((task, index) => (
            <React.Fragment key={task._id}>
              <ListItem
                secondaryAction={
                  <>
                    <Checkbox
                      edge="end"
                      checked={task.completed}
                      onChange={() => handleToggleTask(task._id)}
                      disabled={task.completed}
                    />
                    <IconButton
                      edge="end"
                      onClick={() => setEditTask(task)}
                      disabled={task.completed}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => handleDeleteTask(task._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText
                  primary={
                    editTask?._id === task._id ? (
                      <TextField
                        value={editTask.title}
                        onChange={(e) =>
                          setEditTask({ ...editTask, title: e.target.value })
                        }
                        onBlur={handleEditTask}
                      />
                    ) : (
                      task.title
                    )
                  }
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
