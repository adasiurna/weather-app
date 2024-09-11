import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CurrentWeather from './pages/CurrentWeather';
import ForecastWeather from './pages/ForecastWeather';
import CitySearch from './components/CitySearch';

const App: React.FC = () => {
  const [city, setCity] = useState('Vilnius'); // Default city

  const handleCitySearch = (searchedCity: string) => {
    setCity(searchedCity);
  };

  return (
    <Router>
      <CitySearch onSearch={handleCitySearch} />
      <Routes>
        <Route path="/" element={<CurrentWeather city={city} />} />
        <Route path="/forecast" element={<ForecastWeather city={city} />} />
      </Routes>
    </Router>
  );
};

export default App;
