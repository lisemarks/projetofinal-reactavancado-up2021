import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
import { useLocation } from 'react-router-dom';
import { BuscarPaginaID, UpdatePagina } from '../services/api'

const pagina = {
  titulo: "",
  descricao: ""
}

export default function AlterarPagina() {
  const [ fields, setFields ] = useState(pagina);
  const location = useLocation();
  const { id, slug } = useParams();

  function handleChange(event) {
    const fieldName = event.target.name;
    const value = event.target.value;
    setFields({ ...fields, [fieldName]: value });
  }

  useEffect(() => {
    document.title = "Alterar página"
    buscarPagina()
  }, []);
  
  async function buscarPagina(){
    const dadosPagina = await BuscarPaginaID(id);
    setFields(dadosPagina.data)
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await UpdatePagina(id, fields);
     if (response.status === 200) {
       setFields(pagina);
  }
  }

  return (
    <div>
      <Container component="main">
      <Box component="form" onSubmit={ handleSubmit } sx={{ mt: 5 }}>
        <Typography variant="h4">
          Atualizar página
        </Typography>
        <Grid container spacing={2} sx={{ mt: 5 }}>
          <Grid item sm={12}>
            <TextField 
              label="Titulo" 
              variant="outlined" 
              name="titulo"
              fullWidth 
              onChange={ handleChange } 
              value={fields.titulo} 
            />
          </Grid>
          <Grid item sm={12}>
            <TextField label="Descrição" variant="outlined" name="descricao" fullWidth onChange={ handleChange } value={fields.descricao} />
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