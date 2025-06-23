import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('seller-user') || 'null')
  );
  const [tokens, setTokens] = useState(() =>
    JSON.parse(localStorage.getItem('seller-tokens') || 'null')
  );

  const login = (u, t) => {
    setUser(u);
    setTokens(t);
    localStorage.setItem('seller-user', JSON.stringify(u));
    localStorage.setItem('seller-tokens', JSON.stringify(t));
  };

  const logout = () => {
    setUser(null);
    setTokens(null);
    localStorage.removeItem('seller-user');
    localStorage.removeItem('seller-tokens');
  };

  return (
    <AuthContext.Provider value={{ user, tokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
