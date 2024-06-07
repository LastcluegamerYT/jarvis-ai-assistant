const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const { googleIt } = require('google-it');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to get time
app.get('/get_time', (req, res) => {
    const currentTime = new Date().toLocaleTimeString();
    res.json({ response: `The current time is ${currentTime}` });
});

// Endpoint to get date
app.get('/get_date', (req, res) => {
    const currentDate = new Date().toLocaleDateString();
    res.json({ response: `Today's date is ${currentDate}` });
});

// Endpoint to get a quote
app.get('/get_quote', (req, res) => {
    const quotes = [
        "Believe in yourself!",
        "Keep pushing forward!",
        "You can achieve anything!",
        "Stay positive and work hard!",
        "Never give up!"
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.json({ response: randomQuote });
});

// Endpoint to perform a calculation
app.get('/calculate', (req, res) => {
    const expression = req.query.expression;
    try {
        const result = eval(expression);
        res.json({ response: `The result of ${expression} is ${result}` });
    } catch (error) {
        res.json({ response: "Sorry, I couldn't perform the calculation." });
    }
});

// Endpoint to open applications (basic simulation)
app.get('/open_application', (req, res) => {
    const appName = req.query.app_name;
    if (appName.toLowerCase().includes('notepad')) {
        exec('notepad');
        res.json({ response: "Opening Notepad..." });
    } else if (appName.toLowerCase().includes('calculator')) {
        exec('calc');
        res.json({ response: "Opening Calculator..." });
    } else {
        res.json({ response: `Sorry, I can't open ${appName}.` });
    }
});

// Endpoint to search Google
app.get('/search_google', async (req, res) => {
    const query = req.query.query;
    try {
        const results = await googleIt({ query });
        const firstResult = results[0]?.title || "No results found.";
        res.json({ response: `According to Google: ${firstResult}` });
    } catch (error) {
        res.json({ response: "Sorry, there was an error searching Google." });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
    
