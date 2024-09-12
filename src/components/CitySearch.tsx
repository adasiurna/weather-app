import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface CitySearchProps {
  onSearch: (cityInput: string) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ onSearch }) => {
  const [cityInput, setCityInput] = useState('');
  const location = useLocation();

  const handleSearch = () => {
    if (cityInput) {
      onSearch(cityInput);
      setCityInput(''); // Reset after search
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(); // trigger search if Enter is pressed
    }
  };

  return (
    <>
    <div className="navbar bg-base-200 flex-wrap">
      <div className="flex-1 mr-8 mb-4">
        <a className="btn btn-ghost normal-case text-xl">Weather App</a>
      </div>
      <div className="flex-none gap-2 mb-4 ml-4">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search City"
            className="input input-bordered pe-0 md:pe-4"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="flex-none gap-2 mb-4 ml-4">        
        {/* Navigation Links */}
        <div className="btn-group">
          <Link to="/" className={`btn ${location.pathname === '/' ? 'btn-active' : ''} mr-2`}>
            Current Weather
          </Link>
          <Link to="/forecast" className={`btn ${location.pathname === '/forecast' ? 'btn-active' : ''}`}>
            5-Day Forecast
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default CitySearch;
