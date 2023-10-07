
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