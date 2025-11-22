import { useEffect, useRef, useState } from 'react';

const ThreeDBackground = () => {
  const mountRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!mountRef.current || error) return;

    // Lazy load Three.js only when needed
    import('three').then((THREE) => {
      if (!mountRef.current) return;

      try {
        const THREE_NS = THREE.default || THREE;
        // Scene setup
        const scene = new THREE_NS.Scene();
        const camera = new THREE_NS.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        const renderer = new THREE_NS.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        if (mountRef.current) {
          mountRef.current.appendChild(renderer.domElement);
        }

        // Create floating geometric shapes
        const shapes = [];
        const geometry = [
          new THREE_NS.BoxGeometry(1, 1, 1),
          new THREE_NS.OctahedronGeometry(0.8),
          new THREE_NS.TetrahedronGeometry(0.7),
          new THREE_NS.IcosahedronGeometry(0.6),
        ];

        for (let i = 0; i < 20; i++) {
          const geo = geometry[Math.floor(Math.random() * geometry.length)];
          const material = new THREE_NS.MeshStandardMaterial({
            color: new THREE_NS.Color().setHSL(Math.random(), 0.7, 0.5),
            metalness: 0.8,
            roughness: 0.2,
            emissive: new THREE_NS.Color().setHSL(Math.random(), 0.7, 0.2),
            emissiveIntensity: 0.3,
          });
          const mesh = new THREE_NS.Mesh(geo, material);
          mesh.position.set(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
          );
          mesh.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
          );
          scene.add(mesh);
          shapes.push({
            mesh,
            rotationSpeed: {
              x: (Math.random() - 0.5) * 0.02,
              y: (Math.random() - 0.5) * 0.02,
              z: (Math.random() - 0.5) * 0.02,
            },
            floatSpeed: Math.random() * 0.01 + 0.005,
          });
        }

        // Ambient light
        const ambientLight = new THREE_NS.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);

        // Point lights
        const light1 = new THREE_NS.PointLight(0x00ffff, 1, 100);
        light1.position.set(10, 10, 10);
        scene.add(light1);

        const light2 = new THREE_NS.PointLight(0xff00ff, 1, 100);
        light2.position.set(-10, -10, -10);
        scene.add(light2);

        camera.position.z = 10;

        // Animation
        let time = 0;
        const animate = () => {
          requestAnimationFrame(animate);
          time += 0.01;

          shapes.forEach((shape, index) => {
            shape.mesh.rotation.x += shape.rotationSpeed.x;
            shape.mesh.rotation.y += shape.rotationSpeed.y;
            shape.mesh.rotation.z += shape.rotationSpeed.z;
            shape.mesh.position.y += Math.sin(time + index) * shape.floatSpeed;
          });

          light1.position.x = Math.sin(time) * 15;
          light1.position.y = Math.cos(time) * 15;
          light2.position.x = Math.cos(time) * -15;
          light2.position.y = Math.sin(time) * -15;

          renderer.render(scene, camera);
        };
        animate();

        // Handle resize
        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
          if (mountRef.current && renderer.domElement && mountRef.current.contains(renderer.domElement)) {
            mountRef.current.removeChild(renderer.domElement);
          }
          renderer.dispose();
          shapes.forEach(shape => {
            shape.mesh.geometry.dispose();
            shape.mesh.material.dispose();
          });
        };
      } catch (err) {
        console.error('Three.js initialization error:', err);
        setError(true);
      }
    }).catch((err) => {
      console.error('Failed to load Three.js:', err);
      setError(true);
    });
  }, [error]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10 opacity-30"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ThreeDBackground;

