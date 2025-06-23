import { useDropzone } from 'react-dropzone';

export default function Dropzone({ onUpload }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (files) => onUpload(files[0]),
  });

  return (
    <div
      {...getRootProps()}
      className={`p-4 border-2 border-dashed rounded ${
        isDragActive ? 'bg-green-100' : ''
      }`}
    >
      <input {...getInputProps()} />
      <p>Glisser-déposer ou cliquer pour téléverser une image</p>
    </div>
  );
}
