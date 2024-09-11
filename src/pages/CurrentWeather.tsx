import React, { useState, useEffect } from 'react';
import { fetchCityCoords, fetchWeatherData } from '../api/weatherApi';

interface CurrentWeatherProps {
  city: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ city }) => {
  const [weather, setWeather] = useState<any>(null);
  const [cityName, setCityName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const cityData = await fetchCityCoords(city);
        setCityName(cityData.name);
        const weatherData = await fetchWeatherData(cityData.latitude, cityData.longitude, 'minutely,hourly,daily,alerts');
        setWeather(weatherData);
        console.log('current weather:', weather);
        setError(null);
      } catch (err) {
        setError('Could not fetch weather data');
      }
    };

    if (city) {
      getWeather();
    }
  }, [city]);

  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      {weather ? (
        <>
          <h2 className="card-title">{cityName} - Current Weather</h2>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">              
              <p>Temperature: {weather.current.temp}°C</p>
              <p>Humidity: {weather.current.humidity} %</p>
              <p>Wind speed: {weather.current.wind_speed} m/s</p>
              <p>Weather: {weather.current.weather[0].description}</p>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CurrentWeather;
