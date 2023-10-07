document.addEventListener('DOMContentLoaded', function() {
    const transcriptData = JSON.parse(localStorage.getItem('transcript'));

    if (transcriptData) {
        // Display the data on your page. For demonstration:
        const messagesContainer = document.querySelector('.messages .response p');
        messagesContainer.textContent = transcriptData[0]?.text || 'No transcript available';
    }
});
