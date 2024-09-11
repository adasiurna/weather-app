const WEATHER_API_KEY = '55a777f46e010ce414873996e6695b2c';
const CITY_API_KEY = 'uynHEUaHs3Dx9WvrhLDnhg==5z6U87TzykKisE8l';

// Fetch latitude and longitude of the city
export const fetchCityCoords = async (city: string) => {
  const response = await fetch(`https://api.api-ninjas.com/v1/city?name=${city}`, {
    headers: { 'X-Api-Key': CITY_API_KEY }
  });
  if (!response.ok) throw new Error("City not found");
  const data = await response.json();
  console.log('city: ', data[0]);
  return data[0]; // Assuming the first match is the correct one
};

// Fetch weather data for the given lat and lon
export const fetchWeatherData = async (lat: number, lon: number, exclude: string = '') => {
  const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${WEATHER_API_KEY}&units=metric`);
  console.log('weatherData: ', response);
  if (!response.ok) throw new Error("Weather data fetch failed");
  return await response.json();
};
