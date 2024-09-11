import React, { useState } from 'react';
import CitySearch from './components/CitySearch';

const App: React.FC = () => {
  const [city, setCity] = useState('');

  const handleCitySearch = (searchedCity: string) => {
    setCity(searchedCity);
  };

  return (
      <CitySearch onSearch={handleCitySearch} />
  );
};

export default App;
