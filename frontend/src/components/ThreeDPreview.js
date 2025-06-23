import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { useDropzone } from 'react-dropzone';
import Dropzone from './Dropzone';

export default function ThreeDPreview({ modelUrl, fileUploaded }) {
  const mount = useRef();

  useEffect(() => {
    if (!modelUrl) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(300, 300);
    mount.current.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 2);
    scene.add(light);

    new OBJLoader().load(modelUrl, (obj) => {
      scene.add(obj);
      camera.position.z = 5;
      const animate = () => {
        requestAnimationFrame(animate);
        obj.rotation.y += 0.01;
        renderer.render(scene, camera);
      };
      animate();
    });
    return () => mount.current.removeChild(renderer.domElement);
  }, [modelUrl]);

  return (
    <>
      <Dropzone
        onUpload={fileUploaded}
        accept={{ 'model/*': [] }}
        label="Uploader un modèle 3D (.obj, .gltf, etc.)"
      />
      {modelUrl && <div ref={mount} />}
    </>
  );
}
