import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface CitySearchProps {
  onSearch: (cityInput: string) => void;
  favCities: string[];
}

const CitySearch: React.FC<CitySearchProps> = ({ onSearch, favCities }) => {
  const [cityInput, setCityInput] = useState('');
  const location = useLocation();

  const handleSearch = () => {
    if (cityInput) {
      onSearch(cityInput);
      setCityInput(''); // Reset after search
    }
  };

  const handleFavCityClick = (city: string) => {
    onSearch(city);
  }

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
            className="input input-bordered"
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
          <Link to="/" className={`btn ${location.pathname === '/' ? 'btn-active' : ''}`}>
            Current Weather
          </Link>
          <Link to="/forecast" className={`btn ${location.pathname === '/forecast' ? 'btn-active' : ''}`}>
            5-Day Forecast
          </Link>
        </div>
      </div>
    </div>
    <div>
      {
        favCities.map( (city: string, index: number) => (
          <button
            className="btn btn-accent m-1"
            onClick={() => handleFavCityClick(city)}
          >
            <span>{city}</span>
            {/* "X" icon with its own click handler */}
            <span
              className="ml-4 p-1 text-white hover:text-red-600 cursor-pointer transition duration-150 ease-in-out"
              onClick={(e) => {
                e.stopPropagation(); // Prevents triggering the button's onClick event
                // onDeleteClick();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </button>
        ))
      }
    </div>
    </>
  );
};

export default CitySearch;
