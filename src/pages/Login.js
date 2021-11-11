import { useEffect } from 'react';
import { useHistory } from "react-router-dom";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import { authenticate } from '../services/api'
import { isAuthenticated, login } from '../services/auth';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  login: Yup.string()
    .required("Campo obrigatório"),
  senha: Yup.string()
    .required("Campo obrigatório")
});

function Login() {
  const history = useHistory();

  useEffect(() => {
    if(isAuthenticated()) {
      history.push("/");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
        login: '',
        senha: ''
    },
    validationSchema: schema,
    onSubmit: async (values) => {
        const response = await authenticate(values.login, values.senha);
        if (response.status === 200 && response.data.autenticacao === true) {
            login(response.data.token);
            history.push("/");
        }
    },
  });
  return(
   
    <Container maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
      <Box component="form" onSubmit={ formik.handleSubmit }>

      <TextField label="Usuário" name="login" margin="normal" variant="outlined" fullWidth
                    value={formik.values.login} onChange={formik.handleChange}
                    error={formik.touched.login && Boolean(formik.errors.login)}
                    helperText={formik.touched.login && formik.errors.login} />

      <TextField label="Senha" name="senha" margin="normal" variant="outlined" type="password" fullWidth
                    value={formik.values.senha} onChange={formik.handleChange}
                    error={formik.touched.senha && Boolean(formik.errors.senha)}
                    helperText={formik.touched.senha && formik.errors.senha} />  
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