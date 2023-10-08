var form = document.getElementById('inputForm');
var textarea = document.getElementById('dataToSend');

// Listen to the custom circle click
document.getElementById('customSubmit').addEventListener('click', function() {
    saveData();
});

textarea.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        saveData();
    }
});

function saveData() {
    var inputData = textarea.value;
    localStorage.setItem('userInput', inputData);
    startSpaceshipAnimation();
    form.remove();
    window.location.href = 'outputPage.html';  // redirect to output page
}

function startSpaceshipAnimation() {
    // Your spaceship animation code goes here.
}

document.addEventListener('DOMContentLoaded', function() {
    // Ensure that this code runs after the DOM has been fully loaded
    var customSubmitButton = document.getElementById('customSubmit');
    var inputForm = document.getElementById('inputForm');

    if (customSubmitButton && inputForm) {
        customSubmitButton.addEventListener('click', function() {
            inputForm.submit();
        });
    }
});

// Existing form-based logic
var form = document.getElementById('inputForm');
var textarea = document.getElementById('dataToSend');

document.getElementById('customSubmit').addEventListener('click', function() {
    saveData();
});

textarea.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        saveData();
    }
});

function saveData() {
    var inputData = textarea.value;
    localStorage.setItem('userInput', inputData);
    startSpaceshipAnimation(); // this will start your rocket animation
    form.remove();
    window.location.href = 'outputPage.html';
}

// New rocket-based logic (based on the provided THREE.js code)
let scene, camera, /* ... other variables ... */rocket;

function createScene() { /* ... your function code ... */ }
function handleWindowResize() { /* ... your function code ... */ }
function createLights() { /* ... your function code ... */ }

const loop = () => { /* ... your function code ... */ };

const startSpaceshipAnimation = () => { // renamed from main to better suit its purpose
    createScene();
    createLights();
    renderer.render(scene, camera);
    loop();
};

document.addEventListener('DOMContentLoaded', function() {
    var customSubmitButton = document.getElementById('customSubmit');
    var inputForm = document.getElementById('inputForm');

    if (customSubmitButton && inputForm) {
        customSubmitButton.addEventListener('click', function() {
            inputForm.submit();
        });
    }
});
