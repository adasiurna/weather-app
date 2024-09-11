import React from 'react';

interface CurrentWeatherProps {
  city: string;
  weatherData: any;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ city, weatherData }) => {

  if (!weatherData) {
    return <p>Loading current weather...</p>;
  }

  const weather = weatherData.current;

  return (
    <div className="p-4">
      <h2 className="card-title">{city} - Current Weather</h2>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">              
          <p>Temperature: {weather.temp}°C</p>
          <p>Humidity: {weather.humidity} %</p>
          <p>Wind speed: {weather.wind_speed} m/s</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
