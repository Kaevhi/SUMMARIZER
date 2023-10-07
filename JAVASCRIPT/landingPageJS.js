
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
