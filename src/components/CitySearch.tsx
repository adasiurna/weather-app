import React, { useState } from 'react';

interface CitySearchProps {
  onSearch: (cityInput: string) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ onSearch }) => {
  const [cityInput, setCityInput] = useState('');

  const handleSearch = () => {
    if (cityInput) {
      console.log('cityInput: ', cityInput);
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
      </div>
    </div>
  );
};

export default CitySearch;
