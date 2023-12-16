import "./Temp.css";
import { useEffect, useState } from "react";
import search_icon from "../assets/search.png";
import cloud_icon from "../assets/cloud.png";
import humidity_icon from "../assets/humidity.png";
import windImage from "../assets/wind.png";
import rainyImage from "../assets/rain.png";
import drizzleImage from "../assets/drizzle.png";
import clearImage from "../assets/clear.png";
import visibilityfaizy4_icon from "../assets/visibilityfaizy4.png";
import snow_icon from "../assets/snow.png";
import presser_icon from "../assets/presser1.png";

const Temperature = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [timezone, setTimezone] = useState(null);
  const [data, setData] = useState({
    temp: 10,
    name: "Delhi",
    humidity: 10,
    speed: 2,
    image: cloud_icon,
    visibility: 300,
    pressure: 4,
  });

  const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

  const calculateLocalTime = (weatherData) => {
    const { timezone } = weatherData;
    if (timezone !== null) {
      const utcTime = new Date();
      const offset = utcTime.getTimezoneOffset() * 60000;
      const localTime = utcTime.getTime() + offset + timezone * 1000;
      const localDate = new Date(localTime);
      return localDate;
    }
    return null;
  };

  const [localTime, setLocalTime] = useState(null);

  async function getData(cityName) {
    setLoading(true);
    try {
      if (cityName.trim() === "") {
        console.error("City name is empty");
        return;
      }

      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
      const response = await fetch(apiUrl);
      const weatherData = await response.json();

      const imagePath = getImagePath(weatherData.weather[0].main);

      setData({
        temp: weatherData.main.temp,
        speed: weatherData.wind.speed,
        humidity: weatherData.main.humidity,
        pressure: weatherData.main.pressure,
        visibility: weatherData.visibility,
        name: weatherData.name,
        image: imagePath,
      });

      const localTime = calculateLocalTime(weatherData);
      setTimezone(weatherData.timezone);
      setLocalTime(localTime);
    } catch (err) {
      console.error("No data", err);
      setData({ ...data, image: cloud_icon });
    }finally {
      setLoading(false); // Set loading to false when data fetching completes (either success or failure)
    }
  }

  useEffect(() => {
    getData(name);
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handlerClick = () => {
    if (name !== "") {
      getData(name);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && name.trim() !== "") {
      getData(name);
    }
  };

  const getImagePath = (weatherMain) => {
    let imagePath = cloud_icon;
    switch (weatherMain) {
      case "Clouds":
        imagePath = cloud_icon;
        break;
      case "Clear":
        imagePath = clearImage;
        break;
      case "Rain":
        imagePath = rainyImage;
        break;
      case "Drizzle":
        imagePath = drizzleImage;
        break;
      case "Wind":
        imagePath = windImage;
        break;
      case "Snow":
        imagePath = snow_icon;
        break;
      default:
        imagePath = cloud_icon;
        break;
    }
    return imagePath;
  };

  return (
    <div className="temp-app">
      <div className="top-section">
        <input
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          type="text"
          className="cityName"
          placeholder="Enter City name..."
        />
        <div className="search-text">
          <img src={search_icon} alt="search_icon" onClick={handlerClick} />
        </div>
      </div>
      {loading ? ( // Show loader when loading is true
        <p>Loading...</p>
      ) : ( // Render data when loading is false
      <>
      <div className="wather-img">
        <img src={data.image} className="icon" alt="weather_icon" />
      </div>
      <div className="weather-temp">{data.temp.toFixed(2)}°C</div>
      <div className="weather-location">{data.name}</div>
      <div className="time_date">
        {" "}
        <h1>
          {localTime !== null
            ? `${localTime.toLocaleDateString()} ${localTime.toLocaleTimeString(
                "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                }
              )}`
            : null}
        </h1>
      </div>
      <div className="data-details">
        <div className="element">
          <img src={humidity_icon} className="icon" alt="humidity_icon" />
          <div className="data">
            <div className="humidity-percent">{Math.round(data.humidity)}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windImage} alt="wind_icon" />
          <div className="data">
            <div className="speed">{Math.round(data.speed)} km/h</div>
            <div className="text">Wind</div>
          </div>
        </div>
        <div className="element">
          <img src={presser_icon} alt="pressure_icon" />
          <div className="data">
            <div className="pressure">{Math.round(data.pressure)}</div>
            <div className="text">Pressure</div>
          </div>
        </div>
        <div className="element">
          <img
            className="visibility"
            src={visibilityfaizy4_icon}
            alt="visibility_icon"
          />
          <div className="data">
            <div className="visibility-percent">
              {Math.round(data.visibility)}
            </div>
            <div className="text">Visibility</div>
          </div>
        </div>
      </div>
      </>
       )}
    </div>
  );
};

export default Temperature;
