document.addEventListener('DOMContentLoaded', function() {
    let params = new URLSearchParams(window.location.search);
    let videoId = params.get('video_id');
    
    if (videoId) {
        fetch(`/transcript?video_id=${videoId}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
            } else {
                let messagesContainer = document.querySelector('.messages');
                messagesContainer.innerHTML = ""; // Clear out existing messages
                
                data.forEach(item => {
                    let messageElement = document.createElement('p');
                    messageElement.textContent = item.text;
                    messagesContainer.appendChild(messageElement);
                });
            }
        })
        .catch(error => {
            console.error("Error fetching transcript:", error);
        });
    }
});
