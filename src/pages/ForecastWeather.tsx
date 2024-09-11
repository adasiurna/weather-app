import React from 'react';

interface ForecastWeatherProps {
  city: string;
  weatherData: any;
}

// Helper function to format Unix timestamp to a readable date
const formatDate = (timestamp: number) => {
  const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' }; // Format options for month and day
  return date.toLocaleDateString(undefined, options); // Format date according to the user's locale
};

const ForecastWeather: React.FC<ForecastWeatherProps> = ({ city, weatherData }) => {

  if (!weatherData) {
    return <p>Loading forecast...</p>;
  }

  const forecast = weatherData.daily.slice(0, 5); // Only display 5 days

  return (
    <div className="p-4">
      <h2 className="card-title">{city} - 5 day forecast</h2>
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
    </div>
  );
};

export default ForecastWeather;
