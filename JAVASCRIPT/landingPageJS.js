
var form = document.getElementById('input-area');
var textarea = document.getElementById('dataToSend');

form.addEventListener('submit', function(event) {
    event.preventDefault(); 
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

    window.location.href = 'outputPage.html';
}
document.getElementById('input-area').addEventListener('submit', function(e) {
    e.preventDefault();
    
    let videoURL = document.getElementById('dataToSend').value;
    const videoId = videoURL.split("https://www.youtube.com/watch?v=")[1].split("&")[0];
    
    window.location.href = `/outputPage.html?video_id=${videoId}`;
});
document.getElementById('input-area').addEventListener('submit', function(event) {
    event.preventDefault();

    let videoUrl = document.getElementById('dataToSend').value;
    
    fetch('http://127.0.0.1:5000/transcribe', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            video_url: videoUrl
        })
    })
    .then(response => response.json())
    .then(data => {
        // Here, save your data to localStorage or proceed to the next page.
        localStorage.setItem('transcript', JSON.stringify(data));
        window.location.href = 'outputPage.html';
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
