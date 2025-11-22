import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeDBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Create floating geometric shapes
    const shapes = [];
    const geometry = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.OctahedronGeometry(0.8),
      new THREE.TetrahedronGeometry(0.7),
    ];

    for (let i = 0; i < 15; i++) {
      const geo = geometry[Math.floor(Math.random() * geometry.length)];
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(0.6, 0.7, 0.5),
        metalness: 0.9,
        roughness: 0.1,
        emissive: new THREE.Color().setHSL(0.6, 0.7, 0.2),
        emissiveIntensity: 0.4,
      });
      const mesh = new THREE.Mesh(geo, material);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      scene.add(mesh);
      shapes.push({
        mesh,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.015,
          y: (Math.random() - 0.5) * 0.015,
          z: (Math.random() - 0.5) * 0.015,
        },
      });
    }

    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0x00ffff, 1, 100);
    light1.position.set(10, 10, 10);
    scene.add(light1);

    camera.position.z = 10;

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      shapes.forEach((shape) => {
        shape.mesh.rotation.x += shape.rotationSpeed.x;
        shape.mesh.rotation.y += shape.rotationSpeed.y;
        shape.mesh.rotation.z += shape.rotationSpeed.z;
      });

      light1.position.x = Math.sin(time) * 15;
      light1.position.y = Math.cos(time) * 15;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      shapes.forEach(shape => {
        shape.mesh.geometry.dispose();
        shape.mesh.material.dispose();
      });
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10 opacity-20"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ThreeDBackground;

