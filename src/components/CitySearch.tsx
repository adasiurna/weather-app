import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface CitySearchProps {
  onSearch: (cityInput: string) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ onSearch }) => {
  const [cityInput, setCityInput] = useState('');

  const handleSearch = () => {
    if (cityInput) {
      onSearch(cityInput);
      setCityInput(''); // Reset after search
    }
  };

  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Weather App</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search City"
            className="input input-bordered"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
          />
        </div>
        <button className="btn btn-primary" onClick={handleSearch}>
          Search
        </button>
        {/* Navigation Links */}
        <div className="btn-group">
          <Link to="/" className="btn">
            Current Weather
          </Link>
          <Link to="/forecast" className="btn">
            5-Day Forecast
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CitySearch;
