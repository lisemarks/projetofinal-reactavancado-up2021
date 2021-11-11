import axios from 'axios';
import { getToken } from './auth'

const api = axios.create({
  baseURL: 'https://lisemar-node-aula1.herokuapp.com'
});

export async function authenticate(login, password) {
    const response = await api.post("/login", {
        login: login,
        senha: password
      });
      return response;
 
}

api.interceptors.request.use((config) => {
    const token = getToken();
    config.headers.token = token;
    return config;
  });

  export async function ExcluirCurso(id) {
    const response = await api.delete(`/cursos/${id}`); 
    console.log("Curso excluido", response);
    return response;
  }

  export async function TrazCursos() {
    const response = await api.get('/paginas');
    console.log("Listar cursos", response);
    return response;
  }
