const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

const cities = ["New York", "Boston", "Houston"];

app.get('/random-city', (req, res) => {
    const city = cities[Math.floor(Math.random() * cities.length)];
    res.json({ city });
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
