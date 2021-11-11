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

  export async function ExcluirPagina(id) {
    const response = await api.delete(`/paginas/${id}`); 
    return response;
  }

  export async function TrazPaginas() {
    const response = await api.get('/paginas');
    return response;
  }

  export async function InsertPagina(data) {
    const response = await api.post("/paginas", data);
    return response;
  }

  export async function UpdatePagina(id, data) {
    const response = await api.put(`/paginas/${id}`, data);
    return response;
  }
  
  export async function BuscarPaginaID(id) {
    const response = await api.get(`/paginas/${id}`);
    return response;
  }