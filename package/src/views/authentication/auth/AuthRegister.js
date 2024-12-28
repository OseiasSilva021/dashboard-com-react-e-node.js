/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Box, Typography, Button, Snackbar, Alert } from '@mui/material';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import { Stack } from '@mui/system';

const AuthRegister = ({ title, subtitle, subtext }) => {
  // Estados para os campos do formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Estados para feedback
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Pode ser 'success', 'error', etc.

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita o envio padrão do formulário

    // Montando o corpo da requisição com os dados
    const userData = {
      name,
      email,
      password
    };

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        
        body: JSON.stringify(userData)
        
      }
    
    );

      if (!response.ok) {
        throw new Error('Erro ao registrar usuário');
      }

      const data = await response.json();

     
      // Feedback de sucesso
      setSnackbarMessage('Usuário registrado com sucesso!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      // Limpar campos
      setName('');
      setEmail('');
      setPassword('');

    } catch (error) {
       
      // Feedback de erro
      setSnackbarMessage('Erro ao registrar usuário. Tente novamente.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
    
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <Box component="form" onSubmit={handleSubmit}>
        <Stack mb={3}>
          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name" mb="5px">
            Nome
          </Typography>
          <CustomTextField
            id="name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)} // Atualizando o estado
          />

          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px" mt="25px">
            Endereço de Email
          </Typography>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Atualizando o estado
          />

          <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px" mt="25px">
            Senha
          </Typography>
          <CustomTextField
            id="password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Atualizando o estado
          />
        </Stack>
        <Button color="primary" variant="contained" size="large" fullWidth type="submit">
          Registrar
        </Button>
      </Box>

      {/* Feedback de Sucesso ou Erro */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {subtitle}
    </>
  );
};

export default AuthRegister;
