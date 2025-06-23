import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import api from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen">
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email().required(),
          password: Yup.string().min(6).required(),
        })}
        onSubmit={async (values, { setSubmitting, setStatus }) => {
          try {
            const { data } = await api.post('/auth/login', values);
            login(data.user, data);
            nav('/');
          } catch (e) {
            setStatus('Identifiants invalides');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <Form className="w-80 p-6 bg-white rounded shadow">
            <h1 className="text-xl mb-4">Connexion vendeur</h1>

            <label>Email</label>
            <Field
              type="email"
              name="email"
              className="input mb-2"
              placeholder="you@store.com"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm"
            />

            <label>Mot de passe</label>
            <Field
              type="password"
              name="password"
              className="input mb-2"
              placeholder="••••••••"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm"
            />

            {status && <div className="text-red-600">{status}</div>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full mt-4"
            >
              Se connecter
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
