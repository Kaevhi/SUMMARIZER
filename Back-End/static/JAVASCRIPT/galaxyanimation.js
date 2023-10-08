// Setup the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.insertBefore(renderer.domElement, document.body.firstChild);

// Create galaxy geometry
const galaxyGeometry = new THREE.Geometry();
const particleCount = 1000;

for (let i = 0; i < particleCount; i++) {
    const vertex = new THREE.Vector3();
    vertex.x = Math.random() * 2000 - 1000;
    vertex.y = Math.random() * 2000 - 1000;
    vertex.z = Math.random() * 2000 - 1000;
    galaxyGeometry.vertices.push(vertex);
}

// Define galaxy material
const galaxyMaterial = new THREE.PointsMaterial({ size: 5, sizeAttenuation: false });

// Create galaxy particles
const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
scene.add(galaxy);

// Set camera position
camera.position.z = 200;

// Render loop
function animate() {
    requestAnimationFrame(animate);
    galaxy.rotation.y += 0.002;
    renderer.render(scene, camera);
}
animate();