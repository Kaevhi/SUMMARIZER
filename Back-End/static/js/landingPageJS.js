document.querySelector(".custom-circle").addEventListener("click", function() {
    document.getElementById("inputForm").submit();
});

document.getElementById("inputForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let formData = new FormData(this);

    let textInput = document.getElementById("dataToSend").value.trim();
    let fileInput = document.getElementById("file").files[0];

    if (!textInput && !fileInput) {
        alert("Please provide input text or upload a file before submitting.");
        return;
    }

    fetch("/upload", {
        method: "POST",
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('serverOutput', JSON.stringify(data)); // Store response data
        window.location.href = "/outputPage.html"; // Redirect to output page
    })
    .catch(error => {
        console.error("Error:", error);
        alert("There was an error processing your request. Please try again.");
    });
});

const inputElements = [document.getElementById("dataToSend"), document.getElementById("fileInput")];

inputElements.forEach(el => {
    el.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("inputForm").submit();
        }
    });
});