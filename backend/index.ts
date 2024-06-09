const citiesData = require('./assets/cities.json');
const express = require('express');
const cors = require('cors');
const app = express();

const port = 5000;

app.use(cors());

interface City {
    name: string;
    name_native: string;
    country: string;
    continent: string;
    latitude: string;
    longitude: string;
    population: string;
    founded: string;
    landmarks: string[];
}

const getRandomCity = (): City => {
    const cities: City[] = citiesData.cities;
    const city = cities[Math.floor(Math.random() * cities.length)];
    return city;
}

app.get('/random-city', (req: any, res: { json: (arg0: { city: string; }) => void; }) => {
    const city = getRandomCity();
    res.json({ city: city.name });
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
