import { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import { authenticate } from '../services/api'
import { isAuthenticated, login } from '../services/auth';

import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
    login: '',
    senha: ''
  };

const schema = Yup.object().shape({
  login: Yup.string()
    .required("Campo obrigatório"),
  senha: Yup.string()
    .required("Campo obrigatório")
});

function Login() {
  const [fields, setFields] = useState({ login: "", senha: "" });
  const history = useHistory();

  useEffect(() => {
    if(isAuthenticated()) {
      history.push("/");
    }
  }, []);

  function handleChange(event) {
    const fieldName = event.target.name;
    const value = event.target.value;
    setFields({ ...fields, [fieldName]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try
    {
        const response = await authenticate(fields.login, fields.senha);
        if (response.status === 200 && response.data.autenticacao === true) {
            login(response.data.token);
            history.push("/");
        }
    }
    catch(error)
    {
        alert("Usuário não encontrado");
    }
  }

  return(
   
    <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
      <Box component="form" onSubmit={ handleSubmit }>
        <TextField
          margin="normal"
          label="Usuário"
          variant="outlined"
          fullWidth
          name="login"
          value={ fields.login }
          onChange={ handleChange }
        />
        <TextField
          margin="normal"
          label="Senha"
          variant="outlined"
          type="password"
          fullWidth
          name="senha"
          value={ fields.senha }
          onChange={ handleChange }
        />
        <Button 
          variant="contained"
          fullWidth
          size="large"
          type="submit"
        >
          Entrar
        </Button>
      </Box>
    </Container>

  ); 
} 

export default Login;