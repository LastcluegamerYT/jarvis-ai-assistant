document.getElementById('send-btn').addEventListener('click', () => {
    const userInput = document.getElementById('user-input').value.toLowerCase();
    document.getElementById('user-input').value = '';

    const chatBox = document.getElementById('chat-box');
    const userMessage = document.createElement('div');
    userMessage.textContent = `You: ${userInput}`;
    chatBox.appendChild(userMessage);

    fetch(`/api?input=${encodeURIComponent(userInput)}`)
        .then(response => response.json())
        .then(data => {
            const aiMessage = document.createElement('div');
            aiMessage.textContent = `Jarvis: ${data.response}`;
            chatBox.appendChild(aiMessage);

            // Scroll to bottom
            chatBox.scrollTop = chatBox.scrollHeight;

            // Text to Speech
            const speech = new SpeechSynthesisUtterance(data.response);
            window.speechSynthesis.speak(speech);
        });
});
