// import './Current.css'
// import { useState, useEffect } from "react";
// import axios from "axios";

// const CurrentWeather = () => {
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [currentTime, setCurrentTime] = useState(new Date()); // Initialize with the current time

//   useEffect(() => {
//     // Get user's location using Geolocation API
//     navigator.geolocation.getCurrentPosition(async (position) => {
//       const { latitude, longitude } = position.coords;

//       // Replace 'YOUR_API_KEY' with your OpenWeatherMap API key
//       const apiKey = "13bc954b5abbedb864cff0a17977c918";

//       // Make a request to the OpenWeatherMap API
//       const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

//       try {
//         const response = await axios.get(apiUrl);
//         setWeather(response.data);

//       } catch (error) {
//         console.error("Error fetching weather data:", error);
//       } finally {
//         setLoading(false);
//       }
//     });

//     // Update the current time every minute
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000);

//     // Clean up the interval timer when the component unmounts
//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   return (
//     <div className='current_container'>
//       {/* <h1>Current Weather</h1> */}
// <div className='current_container_top'>

//       {loading ? (
//         <p>Loading...</p>
//       ) : weather ? (
//         <div>
//           <p className="current_location_name">
//             {weather.name}, {weather.sys.country}
//           </p>
//           <p className='current_temperature'>{weather.main.temp}°C</p>
//           <p className="current_weather_description"> {weather.weather[0].description}</p>
//           <p className="current_time">{currentTime.toLocaleTimeString()}</p>
//         </div>
//       ) : (
//         <p>Unable to fetch weather data.</p>
//       )}
//       </div>
//     </div>
//   );
// };

// export default CurrentWeather;

import "./Current.css";
import { useState, useEffect } from "react";
import axios from "axios";
// import search_icon from "../assets/search.png";
import cloud_icon from "../assets/cloud.png";
import humidity_icon from "../assets/humidity.png";
import windImage from "../assets/wind.png";
import rainyImage from "../assets/rain.png";
import drizzleImage from "../assets/drizzle.png";
import clearImage from "../assets/clear.png";
// import visibility_icon from "../assets/visibility1.png";
import snow_icon from "../assets/snow.png";
import presser_icon from "../assets/presser1.png";

const CurrentWeather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date()); // Initialize with the current time

  useEffect(() => {
    // Get user's location using Geolocation API
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      // Replace 'YOUR_API_KEY'
      const apiKey = "13bc954b5abbedb864cff0a17977c918";

      // Make a request to the OpenWeatherMap API
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

      try {
        const response = await axios.get(apiUrl);
        setWeather(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    });
    // current time
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const getWeatherImage = (weatherCondition) => {
    switch (weatherCondition) {
      case "Clouds":
        return cloud_icon;
      case "Clear":
        return clearImage;
      case "Rain":
        return rainyImage;
      case "Drizzle":
        return drizzleImage;
      case "Wind":
        return windImage;
      case "Snow":
        return snow_icon;
      default:
        return cloud_icon;
    }
  };
  return (
    <div className="current_container">
      <div className="current_container_top">
        {loading ? (
          <p>Loading...</p>
        ) : weather ? (
          <div className="current_top_section">
            <p className="current_location_name">
              {weather.name}, {weather.sys.country}
            </p>
            <p className="current_weather_description">
              {weather.weather[0].description}
            </p>
            <img
              src={getWeatherImage(weather.weather[0].main)}
              alt="Weather Icon"
            />
            <p className="current_temperature">{weather.main.temp}°C</p>
            <p className="current_time">{currentTime.toLocaleTimeString()}</p>

            <div className="current_temp_details">
              <div className="cureentWeather_element">
                <img src={humidity_icon} alt="" />
                <p className="current_humidity">{weather.main.humidity}%</p>
                <p className="press_text">Humidity</p>
              </div>
              <div className="cureentWeather_element">
                <img src={windImage} alt="" />
                <p className="current_wind">{weather.wind.speed} km/h</p>
                <p className="press_text">Wind Speed</p>
              </div>
              <div className="cureentWeather_element">
                <img src={presser_icon} alt="" />
                <p className="current_pressure">{weather.main.pressure} hPa</p>
                <p className="press_text">Pressure</p>
              </div>
              <div className="cureentWeather_element">
                <img src={presser_icon} alt="" />
                <p className="current_pressure">{weather.cod}</p>
                <p className="press_text">Cod</p>
              </div>
              {/* timezone */}
            </div>
          </div>
        ) : (
          <p>Unable to fetch weather data.</p>
        )}
        <div></div>
      </div>
    </div>
  );
};

export default CurrentWeather;
