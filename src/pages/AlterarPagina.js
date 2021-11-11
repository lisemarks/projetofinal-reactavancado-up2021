import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import { BuscarPaginaID, UpdatePagina } from '../services/api'
import { useFormik } from 'formik';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  titulo: Yup.string()
    .required("Campo obrigatório"),
  descricao: Yup.string()
    .required("Campo obrigatório")
});

export default function AlterarPagina() {
  const { id } = useParams();

  useEffect(() => {
    document.title = "Alterar página"
    buscarPagina()
  }, []);
  
  async function buscarPagina(){
    const dadosPagina = await BuscarPaginaID(id);
    if (dadosPagina.status === 200) {
         
    }
  }

  const formik = useFormik({
    initialValues: {
        titulo: '',
        descricao: ''
    },
    validationSchema: schema,
    onSubmit: async (values) => {
        const response = await UpdatePagina(id, values);
        if (response.status === 200) {
            alert('Página alterada com sucesso!');
        }
    }
  });

  return (
    <div>
      <Container component="main">
      <Box component="form" onSubmit={ formik.handleSubmit } sx={{ mt: 5 }}>
        <Typography variant="h4">
          Atualizar página
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
              Alterar página
            </Button> 
          </Grid>
        </Grid>     
      </Box>
    </Container>
    </div>
  );
}