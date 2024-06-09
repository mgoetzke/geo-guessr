import React, { useEffect, useState } from 'react';
import './App.css';

export const App: React.FC = () =>  {
  const [landmark, setLandmark] = useState<string>('');
  const [cityList, setCityList] = useState<string[]>([]);
  const [checkAnswer, setCheckAnswer] = useState<boolean | null>(null);

  useEffect(() => {
    async function handleSetupGame() {
      const response = await fetch('http://localhost:5000/start-game');
      const data = await response.json();
      setLandmark(data.landmark);
      setCityList(data.cityList);
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

      const result = await response.json();
      setCheckAnswer(result.result);

    } catch (error) {
      console.error('error on answer check')
    }
  }

  const cityButtons = cityList.map( c => {
    return (<button onClick={() => {handleCheckAnswer(c)}}>{c}</button>)
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random landmark: {landmark}</h1>
        <h3>Answers:</h3>
        {cityButtons}
        <h1>{checkAnswer ? 'yay' : 'booo'}</h1>
      </header>
    </div>
  );
}

export default App;

