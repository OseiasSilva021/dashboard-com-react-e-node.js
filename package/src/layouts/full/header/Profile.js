import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import { IconListCheck, IconUser } from '@tabler/icons-react';

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [profileImage, setProfileImage] = useState(null);  // Estado para armazenar a imagem de perfil
  const navigate = useNavigate();

  // Função para buscar os dados do perfil
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch('http://localhost:3000/users/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Adiciona o token de autenticação
          },
        });
        if (!response.ok) throw new Error('Erro ao buscar os dados do usuário');
        const data = await response.json();
        setProfileImage(data.profileImage); // Assume-se que o backend retorna a URL da imagem
      } catch (error) {
        console.error('Erro ao buscar imagem de perfil:', error);
      }
    };

    fetchProfileImage();
  }, []);  // Apenas carrega uma vez quando o componente for montado

  // Função de logout
  const handleLogout = () => {
    // Remover o token do localStorage
    localStorage.removeItem('token');
    
    // (Opcional) Requisição para o backend invalidar a sessão, se necessário:
    // fetch('http://localhost:3000/api/logout', { method: 'POST' });

    // Redirecionar para a página de login
    navigate('/auth/login');
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const handleProfileClick = () => {
    navigate('/user-profile'); // Redireciona diretamente para a página de perfil
    handleClose2(); // Fecha o menu
  };

  return (
    <Box>
      <IconButton
        size="large"
        aria-label="show 11 new notifications"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={"http://localhost:3000/" + profileImage}  // Usa a imagem de perfil ou uma imagem padrão
          alt="User Profile"
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '200px',
          },
        }}
      >
        <MenuItem onClick={handleProfileClick}>
          <ListItemIcon>
            <IconUser width={20} />
          </ListItemIcon>
          <ListItemText>My Profile</ListItemText>
        </MenuItem>

       
        <MenuItem>
          <ListItemIcon>
            <IconListCheck width={20} />
          </ListItemIcon>
          <ListItemText>My Tasks</ListItemText>
        </MenuItem>
        <Box mt={1} py={1} px={2}>
          {/* Alterado para chamar a função de logout */}
          <Button onClick={handleLogout} variant="outlined" color="primary" fullWidth>
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
