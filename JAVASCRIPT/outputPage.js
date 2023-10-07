document.addEventListener('DOMContentLoaded', function() {
    var savedData = localStorage.getItem('userInput');

    if (savedData) {

        var messageElement = document.createElement('p');
        messageElement.textContent = savedData;

        var messagesContainer = document.querySelector('.messages');
        messagesContainer.appendChild(messageElement);
    } else {

        var noDataMessage = document.createElement('p');
        noDataMessage.textContent = 'No input data available.';
        messagesContainer.appendChild(noDataMessage);
    }
});
