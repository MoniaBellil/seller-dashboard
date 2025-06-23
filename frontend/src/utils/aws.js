import api from '../api/axios';

/**
 * Upload un fichier (image, 3D, etc.) vers le backend NestJS
 * @param {File} file - Le fichier à uploader
 * @returns {Promise<string>} - URL du fichier uploadé
 */
export async function uploadFileToS3(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data.url; // le backend doit renvoyer { url: '...' }
}
