document.addEventListener('DOMContentLoaded', function() {
    fetch('output.json')
        .then(response => response.json())
        .then(data => {
            // Display the transcript data in your frontend
            console.log(data);

            // Example: Display the first line of the transcript
            const messagesContainer = document.querySelector('.messages .response p');
            messagesContainer.textContent = data[0].text;
        })
        .catch(error => console.error('Error fetching transcript:', error));
});
