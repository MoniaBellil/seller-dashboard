import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuth = () => useContext(AuthContext);

export const getAccessToken = () =>
  JSON.parse(localStorage.getItem('seller-tokens') || 'null')?.accessToken;

export const logout = () => {
  localStorage.clear();
  window.location.href = '/login';
};
