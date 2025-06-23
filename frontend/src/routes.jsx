import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductListPage from './pages/ProductListPage';
import ProfilePage from './pages/ProfilePage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/products" element={<ProductListPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}
