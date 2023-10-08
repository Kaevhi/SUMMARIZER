import {
    Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh,
    Points, PointsMaterial, BufferGeometry, Vector3
} from "https://cdn.skypack.dev/three@0.136.0";

let scene = new Scene();
let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Spaceship (Using BoxGeometry for simplicity)
let shipGeometry = new BoxGeometry(1, 0.5, 2);
let shipMaterial = new MeshBasicMaterial({ color: 0x00ff00 });
let spaceship = new Mesh(shipGeometry, shipMaterial);
scene.add(spaceship);

// Stars in the background
let starsGeometry = new BufferGeometry();
let starVertices = [];
for (let i = 0; i < 5000; i++) {
    let x = (Math.random() - 0.5) * 2000;
    let y = (Math.random() - 0.5) * 2000;
    let z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
}
starsGeometry.setAttribute('position', new Float32BufferAttribute(starVertices, 3));
let starsMaterial = new PointsMaterial({ color: 0xFFFFFF, size: 0.1 });
let stars = new Points(starsGeometry, starsMaterial);
scene.add(stars);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);

    spaceship.position.z -= 0.05;
    renderer.render(scene, camera);
}

animate();
// Rocket Body
let rocketBodyGeometry = new THREE.CylinderGeometry(0.5, 0.5, 2, 32);
let rocketBodyMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000 }); // Red color
let rocketBody = new THREE.Mesh(rocketBodyGeometry, rocketBodyMaterial);
scene.add(rocketBody);

// Rocket Tip
let rocketTipGeometry = new THREE.ConeGeometry(0.5, 1, 32);
let rocketTipMaterial = new THREE.MeshBasicMaterial({ color: 0xAAAAAA }); // Gray color
let rocketTip = new THREE.Mesh(rocketTipGeometry, rocketTipMaterial);
rocketTip.position.y = 1.5; // Positioning the tip at the top of the rocket body
scene.add(rocketTip);
