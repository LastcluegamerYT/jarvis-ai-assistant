const chatDisplay = document.getElementById('chat_display');
const userInput = document.getElementById('user_input');

const displayMessage = (sender, message) => {
    const newMessage = document.createElement('div');
    newMessage.textContent = `${sender}: ${message}`;
    chatDisplay.appendChild(newMessage);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
};

const sendCommand = () => {
    const command = userInput.value.trim().toLowerCase();
    displayMessage('You', command);
    processCommand(command);
    userInput.value = '';
};

const handleInput = (event) => {
    if (event.key === 'Enter') {
        sendCommand();
    }
};

const processCommand = (command) => {
    if (command.includes('time')) {
        fetch('/get_time')
            .then(response => response.json())
            .then(data => displayMessage('Jarvis', data.response));
    } else if (command.includes('date')) {
        fetch('/get_date')
            .then(response => response.json())
            .then(data => displayMessage('Jarvis', data.response));
    } else if (command.includes('quote')) {
        fetch('/get_quote')
            .then(response => response.json())
            .then(data => displayMessage('Jarvis', data.response));
    } else if (command.includes('calculate')) {
        const expression = command.split('calculate')[1].trim();
        fetch(`/calculate?expression=${encodeURIComponent(expression)}`)
            .then(response => response.json())
            .then(data => displayMessage('Jarvis', data.response));
    } else if (command.includes('open')) {
        const appName = command.split('open')[1].trim();
        fetch(`/open_application?app_name=${encodeURIComponent(appName)}`)
            .then(response => response.json())
            .then(data => displayMessage('Jarvis', data.response));
    } else {
        fetch(`/search_google?query=${encodeURIComponent(command)}`)
            .then(response => response.json())
            .then(data => displayMessage('Jarvis', data.response));
    }
};
