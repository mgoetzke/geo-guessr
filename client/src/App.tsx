import React, { useState } from 'react';
import './App.css';
import { CorrectAnswer, IncorrectAnswer, DisplayCity, Direction } from '../../types/types';
import CityInfo from './components/CityInfo/CityInfo';
import Map from './components/Map'

export const App: React.FC = () =>  {
  const [landmark, setLandmark] = useState<string>('');
  const [checkAnswer, setCheckAnswer] = useState<boolean | null>(null);
  const [cityInfo, setCityInfo] = useState<DisplayCity | null>(null);
  const [direction, setDirection] = useState<Direction | null>(null);
  const [distance, setDistance] = useState<Number| null>(null);

  const handleSetupGame = async () => {
    const response = await fetch('http://localhost:5000/start-game');
    const data = await response.json();
    setLandmark(data.landmark);
    setCityInfo(null);
    setDirection(null);
    setDistance(null);
    setCheckAnswer(null);
  }

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
        setDistance(result.distance);
      }

    } catch (error) {
      console.error('error on answer check')
    }
  }

  const StartButton = () => {
    return (<button onClick={() => { handleSetupGame() }}>Start</button>)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Landmark Location: City Edition</h1>
      </header>
      <div className="App-body">
        <Map handleMapClick={handleCheckAnswer}/>
        <div className="App-sidebar">
          {!landmark ? 
          (<div className="App-empty"><span>Learn about famous cities and landmarks around the world by clicking to locate them on the map to the left. </span>
            <StartButton/>
          </div>) 
          : (
              <div className="App-game">
                <span>Where in the world is {landmark}?</span>
                {!checkAnswer && (<span>{direction ? `Not quite! Head ${direction} by ${distance} km` : null}</span>)}
                {checkAnswer && cityInfo ? <div className="App-game"><CityInfo cityInfo={cityInfo} /><StartButton/></div> : null}
              </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

