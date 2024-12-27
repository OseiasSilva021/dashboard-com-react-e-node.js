import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Stack,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button,
  TextField,
} from '@mui/material';

const UserProfile = () => {
  // Estados para armazenar os dados do perfil, notificações e imagem
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [appsLinks, setAppsLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar dados do usuário e notificações
    const fetchData = async () => {
      try {
        const userResponse = await fetch('http://localhost:3000/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Inclui o token de autenticação
          },
        });
        if (!userResponse.ok) throw new Error('Erro ao buscar os dados do usuário');
        const userData = await userResponse.json();
        setUser(userData);

        const notificationsResponse = await fetch('http://localhost:3000/api/notifications');
        if (!notificationsResponse.ok) throw new Error('Erro ao buscar as notificações');
        const notificationsData = await notificationsResponse.json();
        setNotifications(notificationsData);

        const appsResponse = await fetch('http://localhost:3000/api/apps');
        if (!appsResponse.ok) throw new Error('Erro ao buscar os aplicativos');
        const appsData = await appsResponse.json();
        setAppsLinks(appsData);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleImageUpload = async (event) => {
    const formData = new FormData();
    formData.append('profileImage', event.target.files[0]);

    try {
      const response = await fetch('http://localhost:3000/users/profile-image', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
       
      });
     
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser); // Atualiza o usuário com a nova imagem
      } else {
        alert('Erro ao atualizar a imagem de perfil');
      }
    } catch (error) {
      console.error('Erro no upload da imagem:', error);
    }
  };

  if (loading) {
    return <Typography variant="h6">Carregando...</Typography>;
  }

  if (!user) {
    return <Typography variant="h6">Erro ao carregar os dados do usuário.</Typography>;
  }
  
  return (
    <Box sx={{ padding: 4 }}>
      {/* Título da Página */}
      <Typography variant="h4" fontWeight="700" gutterBottom>
        Meu Perfil
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" mb={4}>
        Gerencie suas informações pessoais e preferências.
      </Typography>

      {/* Informações do Usuário */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={user.name}
              src={"http://localhost:3000/" + user.profileImage} // Avatar do usuário
              sx={{ width: 80, height: 80 }}
            />
            <Box>
              <Typography variant="h5" fontWeight="600">
                {user.name}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {user.email}
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={() => alert('Função de editar perfil ainda não implementada!')}
              >
                Editar Perfil
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* Upload de Imagem de Perfil */}
      <Box>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          Alterar Imagem de Perfil
        </Typography>
        <TextField
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
      </Box>

      {/* Notificações */}
      <Typography variant="h6" fontWeight="600" gutterBottom>
        Notificações Recentes
      </Typography>
      <Card sx={{ mb: 4 }}>
        <List>
          {notifications.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt={item.title} src={item.avatar || 'https://via.placeholder.com/40'} />
                </ListItemAvatar>
                <ListItemText
                  primary={item.title}
                  secondary={item.subtitle}
                />
              </ListItem>
              {index < notifications.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Card>

      {/* Aplicativos Disponíveis */}
      <Typography variant="h6" fontWeight="600" gutterBottom>
        Aplicativos
      </Typography>
      <Card>
        <List>
          {appsLinks.map((app, index) => (
            <React.Fragment key={index}>
              <ListItem button component="a" href={app.href}>
                <ListItemText
                  primary={app.title}
                  secondary={app.subtext}
                />
              </ListItem>
              {index < appsLinks.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Card>
    </Box>
  );
};

export default UserProfile;
