document.addEventListener("DOMContentLoaded", function () {
    const shapeContainer = document.querySelector(".animated-shapes");
    const particleContainer = document.querySelector(".particles");

    // Function to Create Floating Shapes
    function createShape() {
        const shape = document.createElement("div");
        shape.classList.add("shape");

        const shapeType = ["circle", "square", "triangle"];
        shape.classList.add(shapeType[Math.floor(Math.random() * shapeType.length)]);

        shape.style.left = Math.random() * window.innerWidth + "px";
        shape.style.animationDuration = Math.random() * 5 + 5 + "s";
        shape.style.animationDelay = Math.random() * 2 + "s";

        shapeContainer.appendChild(shape);

        setTimeout(() => {
            shape.remove();
        }, 8000);
    }

    setInterval(createShape, 500);

    // Function to Create Glowing Particles
    function createParticle() {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        particle.style.left = Math.random() * window.innerWidth + "px";
        particle.style.top = Math.random() * window.innerHeight + "px";
        particle.style.animationDuration = Math.random() * 5 + 5 + "s";

        particleContainer.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 10000);
    }

    setInterval(createParticle, 200);
});
