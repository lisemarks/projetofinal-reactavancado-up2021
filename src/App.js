import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { isAuthenticated } from './services/auth';
import Login from './pages/Login'
import ListarCursos from './pages/ListarCursos'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute exact path="/">
          <ListarCursos />
        </PrivateRoute>
        <PrivateRoute path="/create">
        </PrivateRoute>
        <PrivateRoute path="/update/:id/">
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/logout">
          Logout efetuado com sucesso
        </Route>
        <Route>
          404
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