const chatBox = document.getElementById('chat-box');
        const pauseButton = document.getElementById('pause-button');
        let musicPlaying = false;
        let audio = null;

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
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const timeString = `${hours}:${minutes}`;
            timeElement.textContent = `Current time: ${timeString}`;
        }

        updateTime();
        setInterval(updateTime, 60000); // Update time every minute
