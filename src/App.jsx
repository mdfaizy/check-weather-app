import './App.css';
import { useState } from 'react';
import TopSection from './component/TopSection';
import CurrentWeather from './component/CurrentWeather';
import SearchWeather from './component/SearchWeather';

function App() {
  const [currentWeather, setCurrentWeather] = useState(true);

  const handleCurrentWeatherClick = () => {
    setCurrentWeather(true);
  };
  const handleSearchWeatherClick = () => {
    setCurrentWeather(false);
  };

  return (
    <div className="app_container">
      <div className="main">
        <TopSection />
        <div className="user_handle">
          <div onClick={handleCurrentWeatherClick}>
            Current Weather
          </div>
          <div onClick={handleSearchWeatherClick}>
            Search Weather
          </div>
        </div>
      </div>
      {currentWeather ? <CurrentWeather /> : <SearchWeather />}
    </div>
  );
}

export default App;
