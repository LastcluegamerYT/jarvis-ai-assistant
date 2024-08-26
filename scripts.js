const chatBox = document.getElementById('chat-box');
const pauseButton = document.getElementById('pause-button');
let musicPlaying = false;
let audio = null;

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        submitQuestion();
    }
}

function appendMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    const textElement = document.createElement('div');
    textElement.classList.add('text');
    textElement.innerText = '';

    messageElement.appendChild(textElement);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;

    typeEffect(textElement, text);
}

function typeEffect(element, text, index = 0) {
    if (index < text.length) {
        element.innerText += text.charAt(index);
        setTimeout(() => typeEffect(element, text, index + 1), 30);
    }
}

function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = chatBox.querySelector('.typing-indicator');
    if (typingIndicator) {
        chatBox.removeChild(typingIndicator);
    }
}

function stopMusic() {
    if (audio) {
        audio.pause();
        musicPlaying = false;
        pauseButton.style.display = 'none';
    }
}

function playMusic(file) {
    stopMusic();
    audio = new Audio(file);
    audio.play();
    musicPlaying = true;
    pauseButton.style.display = 'block';
}

// Initialize time display
function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    timeElement.innerText = timeString;
}

setInterval(updateTime, 1000);
updateTime();
