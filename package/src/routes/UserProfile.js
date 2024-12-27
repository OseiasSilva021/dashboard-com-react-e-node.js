import React from 'react';
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
} from '@mui/material';

const UserProfile = () => {
  // Dados simulados diretamente no componente
  const notifications = [
    {
      title: 'Nova mensagem',
      subtitle: 'Você tem uma nova mensagem de Maria.',
      avatar: 'https://via.placeholder.com/40', // Imagem de exemplo
    },
    {
      title: 'Atualização de sistema',
      subtitle: 'O sistema foi atualizado com sucesso.',
      avatar: 'https://via.placeholder.com/40',
    },
  ];

  const profileLinks = [
    {
      title: 'Editar Informações',
      subtitle: 'Atualize seus dados pessoais.',
      href: '/edit-profile',
    },
    {
      title: 'Configurações de Segurança',
      subtitle: 'Altere sua senha e outras configurações.',
      href: '/security-settings',
    },
  ];

  const appsLinks = [
    {
      title: 'Aplicativo de Tarefas',
      subtext: 'Gerencie suas tarefas diárias.',
      href: '/tasks-app',
    },
    {
      title: 'Calendário',
      subtext: 'Confira seus eventos.',
      href: '/calendar',
    },
  ];

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
              alt="User Avatar"
              src="https://via.placeholder.com/80" // Imagem de exemplo
              sx={{ width: 80, height: 80 }}
            />
            <Box>
              <Typography variant="h5" fontWeight="600">
                João da Silva {/* Nome do usuário */}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                joao.silva@email.com {/* E-mail do usuário */}
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
                  <Avatar alt={item.title} src={item.avatar} />
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

      {/* Links do Perfil */}
      <Typography variant="h6" fontWeight="600" gutterBottom>
        Configurações do Perfil
      </Typography>
      <Card sx={{ mb: 4 }}>
        <List>
          {profileLinks.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem button component="a" href={item.href}>
                <ListItemText
                  primary={item.title}
                  secondary={item.subtitle}
                />
              </ListItem>
              {index < profileLinks.length - 1 && <Divider variant="inset" component="li" />}
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
