const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Knowledge base
const knowledge = {
    en: {
        greetings: {
            "hi": "Hello sir! Welcome again sir. How can I help you today?",
            "hello": "Hello sir! How can I help you today?",
            "namaste": "Namaste! How can I assist you today?"
        },
        identity: {
            "who are you": "I am Jarvis, your AI assistant.",
            "who are you?": "I am Jarvis, your AI assistant."
        },
        commands: {
            "openai": {"response": "Opening OpenAI website...", "url": "https://chatgpt.com/?oai-dm=1"},
            "google": {"response": "Opening Google...", "url": "https://www.google.com"},
            "facebook": {"response": "Opening Facebook...", "url": "https://www.facebook.com"},
            "instagram": {"response": "Opening Instagram...", "url": "https://www.instagram.com/weird_687/"},
            "time": {"response": `The current time is ${new Date().toLocaleTimeString()}`},
            "date": {"response": `Today's date is ${new Date().toLocaleDateString()}`}
        },
        other: {
            "how are you": "I'm an AI, so I don't have feelings, but I'm here and ready to help!",
            "what can you do": "I can answer questions, provide information, help with tasks, and chat about a wide range of topics.",
            "what is your name": "My name is Jarvis.",
            "where are you from": "I was developed by Prashant Pandey from Jaleswar, Nepal.",
            "how old are you": "I don't have an age, but I was trained on data up until September 2024.",
            "what do you know": "I have knowledge on a wide range of topics up until my last training cut-off in 2021. How can I assist you?",
            "are you a human": "No, I'm an artificial intelligence, but I'm here to help just like a human would.",
            "can you understand me": "Yes, I can understand you! What would you like to talk about?",
            "how do you work": "I use complex algorithms and machine learning to understand and generate text based on your inputs.",
            "why are you here": "I'm here to assist you with information, answer questions, and chat about whatever you need.",
            "what is your purpose": "My purpose is to assist, inform, and provide a conversational partner for users like you.",
            "can you think": "I don't think like a human, but I can process information and provide responses based on my training.",
            "what is AI": "AI stands for artificial intelligence, which is technology designed to simulate human-like intelligence.",
            "are you real": "I'm real in the sense that I'm a functioning program, but I'm not a physical entity.",
            "can you learn": "I don't learn from individual interactions."
        }
    }
};

app.use(express.static('public'));

// API endpoint to handle user input
app.get('/api', (req, res) => {
    const userInput = req.query.input.toLowerCase();
    let response = "I didn't understand that.";

    if (knowledge.en.greetings[userInput]) {
        response = knowledge.en.greetings[userInput];
    } else if (knowledge.en.identity[userInput]) {
        response = knowledge.en.identity[userInput];
    } else if (knowledge.en.commands[userInput]) {
        response = knowledge.en.commands[userInput].response;
        if (knowledge.en.commands[userInput].url) {
            response += ` [${knowledge.en.commands[userInput].url}]`;
        }
    } else if (knowledge.en.other[userInput]) {
        response = knowledge.en.other[userInput];
    }

    res.json({ response });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
          
