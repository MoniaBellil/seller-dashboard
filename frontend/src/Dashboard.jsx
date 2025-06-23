import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get('/auth/profile')
      .then((res) => setProfile(res.data))
      .catch(() => {
        alert('Non connecté');
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Bienvenue au Dashboard</h1>
      {profile ? (
        <div>
          <p>Email : {profile.email}</p>
          <p>Nom : {profile.name}</p>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
};

export default Dashboard;
