import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';

import { ExcluirPagina, TrazPaginas } from "../services/api";
import { IconButton, Button, Dialog} from '@mui/material';
import { Delete } from "@mui/icons-material";
import CreateIcon from '@mui/icons-material/Create';

const RenderDeleteButton = (props) => {
  const { id, row } = props;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  function handleRemove() {
      ExcluirPagina(id).then(() => {
      row.setRows((pagina) => pagina.filter((row) => row._id !== id));
      setIsDialogOpen(false);
    });
  }

  function handleDialog(e) {
    e.stopPropagation();
    setIsDialogOpen(true);
  }

  function fecharDialog(e) {
    e.stopPropagation();
    setIsDialogOpen(false);
  }
  return (
    <>
      <Dialog open={isDialogOpen}>
        <Box padding={4} display="flex" flexDirection="column" alignItems="center">
          <p>
            Deseja excluir a página?
          </p>
          <div>
            <Button variant="contained" onClick={handleRemove}>
              Sim
            </Button>
            <Button variant="contained" onClick={fecharDialog}>
              Não
            </Button>
            </div>
        </Box>
      </Dialog>
      <IconButton onClick={handleDialog}>
        <Delete />
      </IconButton>
      <IconButton component={ Link } to={`/alterar/${id}`}>
      <CreateIcon />
      </IconButton>
    </>
  );
};


const columns = [
  { field: "actions", headerName: 'Ações', width: 150,  renderCell: RenderDeleteButton },
  { field: "descricao", headerName: 'Descricao', width: 300 },
  { field: "titulo", headerName: 'Titulo', width: 150 },
];

function ListarPaginas () {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    document.title = "Listar páginas"
    buscarPaginas();
  }, []);

  async function buscarPaginas() {
    const response = await TrazPaginas();
    const data = response.data.map((pagina) => {
      pagina.setRows = setRows;
      return pagina;
    })
    setRows(data);
  }

  return (
    <Container component="main">
      <Box sx={{ mt: 5 }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Páginas do site
        </Typography>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid getRowId={(row) => row._id} columns={columns} rows={rows}>
          </DataGrid>
        </div>
      </Box>
    </Container>
  );
}

export default ListarPaginas;