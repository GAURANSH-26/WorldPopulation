import React, { useState, useEffect } from 'react';

const people = () => {
  const [city, setCity] = useState('');
  const [population, setPopulation] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPopulation = async () => {
      if (city) {
        try {
          const response = await fetch(`https://restcountries.com/v3.1/name/${city}`);
          const data = await response.json();
          
          if (Array.isArray(data) && data.length > 0) {
            setPopulation(data[0].population);
            setError('');
          } else {
            setPopulation(null);
            setError('City not found');
          }
        } catch (err) {
          setPopulation(null);
          setError('Error fetching data');
        }
      }
    };

    fetchPopulation();
  }, [city]);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    setCity(city);
  };

  return (
    <div>
      <h1>City Population Finder</h1>
      <input
        type="text"
        value={city}
        onChange={handleChange}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
      {population !== null && <p>Population: {population}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default people;
