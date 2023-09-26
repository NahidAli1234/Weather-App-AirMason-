import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = 'ffe456bda9d0687c5583d095fab8e76f';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      try {
        setLoading(true);
        setError(null); // Clear any previous errors
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Error fetching weather data. Please check the location and try again.');
      } finally {
        setLoading(false);
      }
      setLocation('');
    }
  };

  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container">
          {error ? (
            <p className="error">{error}</p>
          ) : (
            <div>
              <div className="top-part">
                <div className="location">
                  <p>{data.name}</p>
                </div>

                {data.main && (
                  <div className="temp">
                    <h1>{data.main.temp.toFixed()}°C</h1>
                  </div>
                )}

                {data.weather && (
                  <div className="description">
                    <p>{data.weather[0].main}</p>
                  </div>
                )}
              </div>

              <div className="bottom-part">
                {data.main && (
                  <div className="feels">
                    <p className="bold">{data.main.feels_like.toFixed()}°C</p>
                    <p>Feels Like</p>
                  </div>
                )}

                {data.main && (
                  <div className="humidity">
                    <p className="bold">{data.main.humidity}%</p>
                    <p>Humidity Percent</p>
                  </div>
                )}

                {data.wind && (
                  <div className="wind">
                    <p className="bold">{data.wind.speed} km/h</p>
                    <p>Wind Speeds</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;



