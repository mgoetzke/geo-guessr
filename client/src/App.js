import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');

  useEffect(() => {
    async function fetchCity() {
      const response = await fetch('http://localhost:5000/random-city');
      const data = await response.json();
      setCity(data.city);
    }

    fetchCity();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Random City: {city}</h1>
      </header>
    </div>
  );
}

export default App;

