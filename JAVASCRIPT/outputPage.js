document.addEventListener('DOMContentLoaded', function() {
    var savedData = localStorage.getItem('userInput');
    var messagesContainer = document.querySelector('.messages');

    if (savedData) {
        var responseDiv = document.createElement('div');
        responseDiv.classList.add('response');
        var messageElement = document.createElement('p');
        messageElement.textContent = savedData;
        responseDiv.appendChild(messageElement);
        messagesContainer.appendChild(responseDiv);
    } else {
        var noDataMessage = document.createElement('p');
        noDataMessage.textContent = 'No input data available.';
        messagesContainer.appendChild(noDataMessage);
    }
});
