import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'
import { deslogar } from '../services/auth';
import { AuthContext } from '../context/authContext';

function Cabecalho() {

  const { logout }  = React.useContext(AuthContext);

  function handlerClickLogout(event) {
    deslogar();
  }

  return(
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar disableGutters>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Curso de barbeiro
            </Typography>
            <Button color="inherit" component={ Link } to="/">Home</Button>
            <Button color="inherit" component={ Link } to="/inserir">Cadastrar página</Button>  
            <Button color="inherit" component={ Link } to="/">Listar páginas</Button>  
            <Button color="inherit" component={ Link } onClick={ handlerClickLogout } to="/">Sair</Button>  
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );

}

export default Cabecalho;