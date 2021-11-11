import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { isAuthenticated } from './services/auth';
import Login from './pages/Login'
import ListarPaginas from './pages/ListarPaginas'
import InserirPagina from './pages/InserirPagina'
import AlterarPagina from './pages/AlterarPagina'
import Cabecalho from './components/Cabecalho'

function App() {
  return (
    <BrowserRouter>
     { isAuthenticated() ? <Cabecalho /> : null }
      <Switch>
        <PrivateRoute exact path="/">
          <ListarPaginas />
        </PrivateRoute>
        <PrivateRoute path="/inserir">
          <InserirPagina />
        </PrivateRoute>
        <PrivateRoute path="/alterar/:id/">
        <AlterarPagina />
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          Logout efetuado com sucesso
        </Route>
        <Route>
          Página não encontrada
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route { ...rest }>
      { isAuthenticated() ? children : <Redirect to="/login" /> }
    </Route>
  );
}

export default App;