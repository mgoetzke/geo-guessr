const citiesData = require('./assets/cities.json');
const express = require('express');
const cors = require('cors');
const app = express();

const  {calculateRadialDistanceBetweenCoordinates: findDistance, findBearing: findDirection } = require('./utils/utils');

const port = 5000;

type Direction = 'N' | 'S' | 'E' | 'W' | 'NW' | 'NE' | 'SW' | 'SE';

interface City {
    name: string;
    name_native: string;
    country: string;
    continent: string;
    latitude: number;
    longitude: number;
    population: string;
    founded: string;
    landmarks: string[];
}

type DisplayCity = Omit<City, 'landmarks' | 'latitude' | 'longitude'>;


interface Answer {
    correct: boolean;
}

interface CorrectAnswer extends Answer {
    city: DisplayCity;
}

interface IncorrectAnswer extends Answer {
    distance: number;
    direction: Direction;
}

app.use(cors());
app.use(express.json());

let currentCity: City | null = null;

const getRandomCity = (): City => {
    const cities: City[] = citiesData.cities;
    const city = cities[Math.floor(Math.random() * cities.length)];
    return city;
}

const getRandomLandmark = (landmarks: string[]): string => {
    const landmark = landmarks[Math.floor(Math.random() * landmarks.length)];
    return landmark;
}

app.get('/start-game', (req: any, res: { json: (arg0: { landmark: string }) => void; }) => {
    const city = getRandomCity();
    currentCity = city;
    const landmark = getRandomLandmark(city.landmarks);

    res.json({ landmark });
});

app.post('/handle-guess', (req: any, res: { json: (arg0: CorrectAnswer | IncorrectAnswer) => void; }) => {
    const { countryName, latitude, longitude } = req.body;
    const isCorrectAnswer = countryName === currentCity?.country;

    if (!isCorrectAnswer && currentCity) {
        const sourceCoordinates = {latitude: currentCity.latitude, longitude: currentCity.longitude};
        const destinationCoordinates = { latitude, longitude };

        const distance = findDistance(sourceCoordinates, destinationCoordinates)
        const direction = findDirection(sourceCoordinates, destinationCoordinates)

        res.json({
            correct: false,
            distance: Math.trunc(distance),
            direction
        });
    }

    else if (isCorrectAnswer && currentCity){
        const result = {
        correct: true,
        city : {
            name: currentCity.name,
            name_native: currentCity.name_native,
            country: currentCity.country,
            continent: currentCity.continent,
            population: currentCity.population,
            founded: currentCity.founded,

        }
    }
    res.json({ ...result });
    }

});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
