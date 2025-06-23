import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../api/axios';
import Dropzone from '../components/Dropzone';
import ThreeDPreview from '../components/ThreeDPreview';

import { uploadFileToS3 } from '../utils/aws';


export default function ProductForm() {
  const { id } = useParams();        // "new" ou véritable id
  const nav = useNavigate();
  const [initial, setInitial] = useState({ name: '', price: 0, stock: 0 });

  useEffect(() => {
    if (id !== 'new')
      api.get(`/products/${id}`).then((r) => setInitial(r.data));
  }, [id]);

  return (
    <Formik
      enableReinitialize
      initialValues={initial}
      validationSchema={Yup.object({
        name: Yup.string().required(),
        price: Yup.number().min(0).required(),
        stock: Yup.number().min(0).required(),
      })}
      onSubmit={async (values) => {
        if (id === 'new') await api.post('/products', values);
        else await api.put(`/products/${id}`, values);
        nav('/');
      }}
    >
      {({ isSubmitting }) => (
        <Form className="max-w-xl space-y-4">
          <h1 className="text-xl font-semibold">
            {id === 'new' ? 'Créer produit' : 'Éditer produit'}
          </h1>

          <label>Nom</label>
          <Field name="name" className="input" />
          <ErrorMessage name="name" component="div" className="text-red-500" />

          <label>Prix (€)</label>
          <Field name="price" type="number" className="input" />
          <ErrorMessage name="price" component="div" className="text-red-500" />

          <label>Stock</label>
          <Field name="stock" type="number" className="input" />
          <ErrorMessage name="stock" component="div" className="text-red-500" />

          {/* Upload images */}
          <Dropzone
            onUpload={async (file) => {
              const imageUrl = await uploadFileToS3(file);      // implémentation perso
              await api.post(`/products/${id}/gallery`, { imageUrl });
            }}
          />

          {/* Upload / preview 3D */}
          <ThreeDPreview
            fileUploaded={async (file) => {
              const modelUrl = await uploadFileToS3(file);
              await api.post(`/products/${id}/3dmodel`, { modelUrl });
            }}
            modelUrl={
              initial._id ? `/products/${initial._id}/3dmodel` : null
            }
          />

          <button className="btn btn-primary" disabled={isSubmitting}>
            Enregistrer
          </button>
        </Form>
      )}
    </Formik>
  );
}
