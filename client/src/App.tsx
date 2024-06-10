import React, { useEffect, useState } from 'react';
import './App.css';
import { CorrectAnswer, IncorrectAnswer, DisplayCity, Direction } from '../../types/types';
import CityInfo from './components/CityInfo/CityInfo';
import Map from './components/Map'

export const App: React.FC = () =>  {
  const [landmark, setLandmark] = useState<string>('');
  const [cityList, setCityList] = useState<string[]>([]);
  const [checkAnswer, setCheckAnswer] = useState<boolean | null>(null);
  const [cityInfo, setCityInfo] = useState<DisplayCity | null>(null);
  const [direction, setDirection] = useState<Direction | null>(null);

  useEffect(() => {
    async function handleSetupGame() {
      const response = await fetch('http://localhost:5000/start-game');
      const data = await response.json();
      setLandmark(data.landmark);
      setCityList(data.cityList);
      setCityInfo(null);
      setDirection(null);
      setCheckAnswer(null);
    }

    handleSetupGame();
  }, []);

  const handleCheckAnswer = async ({countryName, latitude, longitude} : {countryName: string, latitude: number, longitude: number}) => {
    try {
      const response = await fetch('http://localhost:5000/handle-guess', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({countryName: countryName, latitude: latitude, longitude: longitude}),
      });

      const result: CorrectAnswer | IncorrectAnswer = await response.json();
      if ('city' in result) {
        setCheckAnswer(true);
        setCityInfo(result.city);
      } else {
        setCheckAnswer(false);
        setDirection(result.direction);
      }

    } catch (error) {
      console.error('error on answer check')
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random landmark: {landmark}</h1>
        <Map handleMapClick={handleCheckAnswer}/>
        <h1>{cityInfo ? <CityInfo cityInfo={cityInfo}/> : null}</h1>
        <h1>{direction ? `Not quite! Head ${direction}` : null }</h1>
      </header>
    </div>
  );
}

export default App;

