import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

export default function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products').then((res) => setProducts(res.data));
  }, []);

  const onDelete = async (id) => {
   // eslint-disable-next-line no-restricted-globals
if (!confirm('Supprimer ce produit ?')) return;

    await api.delete(`/products/${id}`);
    setProducts((p) => p.filter((x) => x._id !== id));
  };

  return (
    <>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Mes produits</h1>
        <Link to="/products/new" className="btn btn-primary">
          + Nouveau
        </Link>
      </header>

      <table className="w-full">
        <thead>
          <tr className="text-left border-b">
            <th>Nom</th>
            <th>Stock</th>
            <th>Prix</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-b">
              <td>{p.name}</td>
              <td>{p.stock}</td>
              <td>{p.price} €</td>
              <td className="space-x-2">
                <Link to={`/products/${p._id}`} className="btn btn-sm">
                  Éditer
                </Link>
                <button onClick={() => onDelete(p._id)} className="btn btn-sm btn-danger">
                  Suppr.
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
