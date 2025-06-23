import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white px-4 py-2 flex justify-between">
      <div className="space-x-4">
        <Link to="/">Produits</Link>
        <Link to="/profile">Profil</Link>
      </div>
      <button onClick={logout} className="hover:underline">
        Déconnexion
      </button>
    </nav>
  );
}
