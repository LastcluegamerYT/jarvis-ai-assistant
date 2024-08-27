const chatBox = document.getElementById('chat-box');
const pauseButton = document.getElementById('pause-button');
let musicPlaying = false;
let audio = null;

const OCR_API_KEY = 'mP83/0xTuTK+ytjgp2166g==f95yrV3P2KZaWYQg';

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        submitQuestion();
    }
}

async function submitQuestion() {
    const input = document.getElementById('user_input');
    const message = input.value.trim();

    if (message) {
        appendMessage('user', message);
        input.value = '';
        showTypingIndicator();

        try {
            const response = await fetch('https://prashantytt34.pythonanywhere.com/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_input: message })
            });
            const data = await response.json();

            hideTypingIndicator();
            appendMessage('bot', data.response || "Sorry, I didn't understand that.");

            if (data.musicFile) {
                playMusic(data.musicFile);
            }
        } catch (error) {
            console.error('Error:', error);
            hideTypingIndicator();
            appendMessage('bot', "Sar, network nai hau check kar mc.\nfir sa try kar nai ta gand maro 69 pose me.");
        }
    }
}

function appendMessage(sender, text, image = null) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);

    if (image) {
        const imageElement = document.createElement('img');
        imageElement.src = image;
        imageElement.style.maxWidth = '200px';
        messageElement.appendChild(imageElement);
    }

    if (text) {
        const textElement = document.createElement('div');
        textElement.classList.add('text');
        textElement.innerText = '';

        messageElement.appendChild(textElement);
        typeEffect(textElement, text);
    }

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
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

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64Image = e.target.result.split(',')[1];
            appendMessage('user', null, e.target.result);
            extractTextFromImage(base64Image);
        };
        reader.readAsDataURL(file);
    }
}

async function extractTextFromImage(base64Image) {
    try {
        showTypingIndicator();

        const formData = new FormData();
        formData.append('image', `data:image/png;base64,${base64Image}`);

        const response = await fetch('https://api.api-ninjas.com/v1/imagetotext', {
            method: 'POST',
            headers: {
                'X-Api-Key': OCR_API_KEY,
                'Content-Type': 'multipart/form-data'
            },
            body: formData,
        });

        const result = await response.json();
        const extractedText = result.map(item => item.text).join(' ');

        appendMessage('user', `Image content text: ${extractedText}`);
        sendExtractedTextToAI(extractedText);
    } catch (error) {
        console.error('OCR Error:', error);
        appendMessage('bot', "Failed to extract text from the image.");
        hideTypingIndicator();
    }
}

async function sendExtractedTextToAI(extractedText) {
    try {
        const response = await fetch('https://prashantytt34.pythonanywhere.com/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_input: `Image content text: ${extractedText}` })
        });
        const data = await response.json();

        hideTypingIndicator();
        appendMessage('bot', data.response || "Sorry, I didn't understand that.");

        if (data.musicFile) {
            playMusic(data.musicFile);
        }
    } catch (error) {
        console.error('Error:', error);
        hideTypingIndicator();
        appendMessage('bot', "Failed to process the extracted text.");
    }
}

function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    timeElement.textContent = `Current time: ${timeString}`;
}

updateTime();
setInterval(updateTime, 60000);
        
