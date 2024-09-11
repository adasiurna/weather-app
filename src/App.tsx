import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CurrentWeather from './pages/CurrentWeather';
import ForecastWeather from './pages/ForecastWeather';
import CitySearch from './components/CitySearch';
import { fetchCityCoords, fetchWeatherData } from './api/weatherApi';

const App: React.FC = () => {
  const [city, setCity] = useState('Vilnius');
  const [cityName, setCityName] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCitySearch = async (searchedCity: string) => {
    if (searchedCity !== city) {
      // if searched city is different, reset data and fetch new data
      setCity(searchedCity);
      setWeatherData(null); // reset weather data for the new city
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      if (weatherData === null) { // only fetch if no cached data
        try {
          const cityCoords = await fetchCityCoords(city);
          setCityName(cityCoords.name);
          const fetchedWeatherData = await fetchWeatherData(cityCoords.latitude, cityCoords.longitude);
          setWeatherData(fetchedWeatherData);
          setError(null);
        } catch (err) {
          setError('Could not fetch weather data');
        }
      }
    };

    fetchWeather();
  }, [city, weatherData]);

  return (
    <Router>
      <CitySearch onSearch={handleCitySearch} />
      {error ? (
        <p>{error}</p>
      ) : (
        <Routes>
          <Route path="/" element={<CurrentWeather city={cityName} weatherData={weatherData} />} />
          <Route path="/forecast" element={<ForecastWeather city={cityName} weatherData={weatherData} />} />
        </Routes>
      )}
    </Router>
  );
};

export default App;
