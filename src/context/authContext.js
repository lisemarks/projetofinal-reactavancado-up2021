import React from 'react';
import { authenticate } from '../services/api';

const AuthContext = React.createContext({});

function AuthProvider(props) {
  const [token, setToken] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      setToken(token);
    }
  }, []);

  React.useEffect(() => {
    if (token === null) {
      localStorage.removeItem("token")
    } else {
      localStorage.setItem("token", token);
    }

    setIsAuthenticated((token !== null));
  }, [token]);

  function logout() {
    setToken(null);
    }

  return (
    <AuthContext.Provider value={{
      token,
      isAuthenticated,
      logout: logout
    }}>
      { props.children }
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };