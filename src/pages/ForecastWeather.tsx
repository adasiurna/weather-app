import React, { useState, useEffect } from 'react';
import { fetchCityCoords, fetchWeatherData } from '../api/weatherApi';

interface ForecastWeatherProps {
  city: string;
}

// Helper function to format Unix timestamp to a readable date
const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' }; // Format options for month and day
  return date.toLocaleDateString(undefined, options); // Format date according to the user's locale
};

const ForecastWeather: React.FC<ForecastWeatherProps> = ({ city }) => {
  const [forecast, setForecast] = useState<any>(null);
  const [cityName, setCityName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getForecast = async () => {
      try {
        const cityData = await fetchCityCoords(city);
        setCityName(cityData.name);
        const weatherData = await fetchWeatherData(cityData.latitude, cityData.longitude);
        setForecast(weatherData.daily.slice(0, 5)); // Only display 5 days
        console.log('forecast:', weatherData.daily.slice(0, 5));
        setError(null);
      } catch (err) {
        setError('Could not fetch forecast data');
      }
    };

    if (city) {
      getForecast();
    }
  }, [city]);

  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">      
      {forecast ? (
        <>
        <h2 className="card-title">{cityName} - 5 day forecast</h2>
        {forecast.map((day: any, index: number) => (
          <div key={index} className="card bg-base-100 shadow-xl mb-4">
            <div className="card-body">
              <h2 className="card-title">{formatDate(day.dt)}</h2>
              <p>Temperature: {day.temp.day}°C</p>
              <p>Humidity: {day.humidity} %</p>
              <p>Wind speed: {day.wind_speed} m/s</p>
              <p>Weather: {day.weather[0].description}</p>
            </div>
          </div>
        ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ForecastWeather;
