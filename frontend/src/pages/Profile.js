import { useAuth } from '../hooks/useAuth';
import api from '../api/axios';
import { useEffect, useState } from 'react';

export default function Profile() {
  const { user } = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/auth/profile').then((r) => setData(r.data));
  }, []);

  if (!data) return 'Loading...';

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl mb-4">Profil</h1>
      <p><b>Nom :</b> {data.name}</p>
      <p><b>Email :</b> {data.email}</p>
      {/* Ajoute ici un formulaire si tu veux permettre la mise à jour */}
    </div>
  );
}
