function isAuthenticated() {
    return localStorage.getItem("token") !== null;
  }
  
  function getToken() {
    return localStorage.getItem("token");
  }
  
  function login(token) {
    localStorage.setItem("token", token);
  }

  function deslogar() {
    localStorage.removeItem("token");
  }
  
  export { isAuthenticated, getToken, login, deslogar };