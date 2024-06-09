import React, { useEffect, useState } from 'react';
import './App.css';
import { CorrectAnswer, IncorrectAnswer, DisplayCity } from '../../types/types';

export const App: React.FC = () =>  {
  const [landmark, setLandmark] = useState<string>('');
  const [cityList, setCityList] = useState<string[]>([]);
  const [checkAnswer, setCheckAnswer] = useState<boolean | null>(null);
  const [cityInfo, setCityInfo] = useState<DisplayCity | null>(null);
  const [distance, setDistance] = useState<number |null>(null);

  useEffect(() => {
    async function handleSetupGame() {
      const response = await fetch('http://localhost:5000/start-game');
      const data = await response.json();
      setLandmark(data.landmark);
      setCityList(data.cityList);
      setCityInfo(null);
      setDistance(null);
      setCheckAnswer(null);
    }

    handleSetupGame();
  }, []);

  const handleCheckAnswer = async (cityName: string) => {
    try {
      const response = await fetch('http://localhost:5000/handle-guess', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({cityName: cityName}),
      });

      const result: CorrectAnswer | IncorrectAnswer = await response.json();
      if ('city' in result) {
        setCheckAnswer(true);
        setCityInfo(result.city);
      } else {
        setCheckAnswer(false);
        setDistance(result.distance);
      }

    } catch (error) {
      console.error('error on answer check')
    }
  }

  const cityButtons = cityList.map( c => {
    return (<button key={c} onClick={() => {handleCheckAnswer(c)}}>{c}</button>)
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random landmark: {landmark}</h1>
        <h3>Answers:</h3>
        {cityButtons}
        <h1>{cityInfo ? 'well done!' : null}</h1>
        <h1>{distance ? `not quite! you are ${distance} miles off`: null}</h1>
      </header>
    </div>
  );
}

export default App;

