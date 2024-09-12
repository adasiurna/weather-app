import React from 'react'

interface FavCitiesProps {
  favCities: string[] | null;
  onSearch: (cityInput: string) => void;
  onFavCityDelete: (cityInput: string) => void;
}

const FavCities: React.FC<FavCitiesProps> = ({favCities, onSearch, onFavCityDelete}) => {

  return (
    <div>
      { favCities && favCities.map( (city: string, index: number) => (
          <button
            className="btn btn-accent m-1"
            key={index}
            onClick={() => onSearch(city)}
          >
            <span>{city}</span>

            {/* "X" icon with its own click handler */}
            <span
              className="ml-4 p-1 text-white hover:text-red-600 cursor-pointer transition duration-150 ease-in-out"
              onClick={(e) => {
                e.stopPropagation(); // Prevents triggering the button's onClick event
                onFavCityDelete(city);
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
        ))}
    </div>
  )
}

export default FavCities