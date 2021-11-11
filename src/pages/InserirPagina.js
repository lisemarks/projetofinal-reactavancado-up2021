import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InsertPagina } from '../services/api'

const schema = Yup.object().shape({
    titulo: Yup.string()
      .required("Campo obrigatório"),
    descricao: Yup.string()
      .required("Campo obrigatório")
  });

function InserirPagina() {

  useEffect(() => {
    document.title = "Cadastrar página"
  }, []);

  const formik = useFormik({
    initialValues: {
        titulo: '',
        descricao: ''
    },
    validationSchema: schema,
    onSubmit: async (values) => {
        const response = await InsertPagina(values);
        if (response.status === 200) {
            alert('Página inserida com sucesso!');
        }
    }
  });

  return(
    <Container component="main">
      <Box component="form" onSubmit={ formik.handleSubmit } sx={{ mt: 5 }}>
        <Typography variant="h4">
          Nova página do site
        </Typography>
        <Grid container spacing={2} sx={{ mt: 5 }}>
          <Grid item sm={12}>
          <TextField label="Título" name="titulo" margin="normal" variant="outlined" fullWidth
                    value={formik.values.titulo} onChange={formik.handleChange}
                    error={formik.touched.titulo && Boolean(formik.errors.titulo)}
                    helperText={formik.touched.titulo && formik.errors.titulo} />
          </Grid>
          <Grid item sm={12}>
          <TextField label="Descrição" name="descricao" margin="normal" variant="outlined" fullWidth
                    value={formik.values.descricao} onChange={formik.handleChange}
                    error={formik.touched.descricao && Boolean(formik.errors.descricao)}
                    helperText={formik.touched.descricao && formik.errors.descricao} /> 
          </Grid>
          
          <Grid item sm={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large" 
            >
              Cadastrar página
            </Button> 
          </Grid>
        </Grid>     
      </Box>
    </Container>
  );
}

export default InserirPagina;