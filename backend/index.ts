const citiesData = require('./assets/cities.json');
const express = require('express');
const cors = require('cors');
const app = express();

const port = 5000;

app.use(cors());
app.use(express.json());

let currentCity: City | null = null;

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

const getValidCities = (): string[] => {
    const cities: City[] = citiesData.cities;
    return cities.map(city => city.name);
}

const getRandomLandmark = (landmarks: string[]): string => {
    const landmark = landmarks[Math.floor(Math.random() * landmarks.length)];
    return landmark;
}

app.get('/start-game', (req: any, res: { json: (arg0: { landmark: string; cityList: string[] }) => void; }) => {
    const city = getRandomCity();
    currentCity = city;
    const landmark = getRandomLandmark(city.landmarks);
    const cityList = getValidCities();

    res.json({ landmark, cityList });
});

app.post('/handle-guess', (req: any, res: { json: (arg0: { result: boolean; }) => void; }) => {
    const { cityName } = req.body;
    const isCorrectAnswer = cityName === currentCity?.name;

    res.json({ result: isCorrectAnswer });
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
