import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';

export default function Reviews() {
  const { id } = useParams(); // product id
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get(`/products/${id}/reviews`).then((r) => setReviews(r.data));
  }, [id]);

  const deleteReview = async (rid) => {
    await api.delete(`/products/${id}/reviews/${rid}`);
    setReviews((r) => r.filter((x) => x._id !== rid));
  };

  return (
    <>
      <h1 className="text-xl mb-4">Avis produit</h1>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th>Auteur</th>
            <th>Note</th>
            <th>Commentaire</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {reviews.map((rev) => (
            <tr key={rev._id} className="border-b">
              <td>{rev.author}</td>
              <td>{'★'.repeat(rev.rating)}</td>
              <td>{rev.comment}</td>
              <td>
                <button onClick={() => deleteReview(rev._id)} className="btn btn-sm btn-danger">
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
