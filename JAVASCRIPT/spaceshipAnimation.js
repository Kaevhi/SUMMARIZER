import {
    Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh, Points, BufferGeometry, Float32BufferAttribute, Vector3, PointsMaterial
} from "https://cdn.skypack.dev/three@0.136.0";

let scene = new Scene();
let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Spaceship
let shipGeometry = new BoxGeometry(1, 0.5, 2);
let shipMaterial = new MeshBasicMaterial({ color: 0x00ff00 });
let spaceship = new Mesh(shipGeometry, shipMaterial);
scene.add(spaceship);

// Stars
let starVertices = [];
for (let i = 0; i < 10000; i++) {
    let x = (Math.random() - 0.5) * 2000;
    let y = (Math.random() - 0.5) * 2000;
    let z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
}

let starGeometry = new BufferGeometry();
starGeometry.setAttribute('position', new Float32BufferAttribute(starVertices, 3));
let starMaterial = new PointsMaterial({ color: 0xFFFFFF, size: 0.1 });
let stars = new Points(starGeometry, starMaterial);
scene.add(stars);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    spaceship.position.z -= 0.05;  // Make the spaceship move forward
    renderer.render(scene, camera);
}

animate();
