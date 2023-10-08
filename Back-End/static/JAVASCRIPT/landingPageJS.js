document.addEventListener('DOMContentLoaded', function() {
    // Form and textarea references
    var form = document.getElementById('inputForm');
    var textarea = document.getElementById('dataToSend');
    var customSubmitButton = document.getElementById('customSubmit');
    var customCircle = document.querySelector('.custom-circle');

    // Add event listener for the custom submit button
    if (customSubmitButton && form) {
        customSubmitButton.addEventListener('click', function() {
            saveData();
        });
    }

    // Add event listener for textarea Enter key press
    textarea.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            saveData();
        }
    });

    // Add event listener for custom circle click
    // ... other code ...

// Updated event listener for custom circle click
if (customCircle) {
    customCircle.addEventListener('click', function() {
        startRainAnimation();
        igniteFire(); // ignite the fire
        setTimeout(() => {
            stopRainAnimation();
            extinguishFire(); // extinguish the fire after 5 seconds
        }, 5000);
    });
}

// ... other functions ...

function igniteFire() {
    let fires = document.querySelectorAll('.fire');
    fires.forEach(fire => {
        fire.style.display = "block";
        fire.style.animation = "fireAnimation 0.5s infinite";
    });
}

function extinguishFire() {
    let fires = document.querySelectorAll('.fire');
    fires.forEach(fire => {
        fire.style.animation = "";  // Stop the animation
        fire.style.display = "none";
    });
}

});

function saveData() {
    var formData = new FormData(document.getElementById('inputForm'));
    
    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('backendResponse', JSON.stringify(data)); 
        startSpaceshipAnimation(); 
        window.location.href = 'outputPage.html';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function startSpaceshipAnimation() {
    // Your spaceship animation code goes here.
    createScene();
    createLights();
    renderer.render(scene, camera);
    loop();
}

function startRainAnimation() {
    // Get all rain and drop elements
    var rains = document.querySelectorAll('.rain, .drop');
    rains.forEach(function(rainElement) {
        rainElement.style.opacity = "0.2";
        rainElement.style.animationPlayState = "running";
    });
}

function stopRainAnimation() {
    // Get all rain and drop elements
    var rains = document.querySelectorAll('.rain, .drop');
    rains.forEach(function(rainElement) {
        rainElement.style.opacity = "0";
        rainElement.style.animationPlayState = "paused";
    });
}
let oscillationSpeed = 0.005;
let oscillationDistance = 50;

const loop = () => {
    const time = Date.now() * oscillationSpeed;

    renderer.render(scene, camera);

    if (rocket) {
        rocket.rotation.y += 0.01;  // This will continue to rotate the rocket
        rocket.position.x = Math.sin(time) * oscillationDistance;
        rocket.position.z = Math.cos(time) * oscillationDistance;
    }

    requestAnimationFrame(loop);
};

let scene, camera, renderer, rocket;
let loader = new THREE.GLTFLoader();

function createScene() {
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas').appendChild(renderer.domElement);

    // Load the 3D model
    loader.load('path/to/spaceship.glb', function(gltf) {
        rocket = gltf.scene;
        scene.add(rocket);
    }, undefined, function(error) {
        console.error(error);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        let width = window.innerWidth;
        let height = window.innerHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
}

function createLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);
}
