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
import { YOUR_API_KEY } from "../config";
const Temperature = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState({
    temp: 10,
    name: "Delhi",
    humidity: 10,
    speed: 2,
    image: cloud_icon,
    visibility: 300,
    pressure: 4,
  });
//const YOUR_API_KEY="13bc954b5abbedb864cff0a17977c918";
  async function getData() {
    try {
      if (name.trim() === "") {
        console.error("City name is empty");
        return;
      }
      // const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=13bc954b5abbedb864cff0a17977c918&units=metric`
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${YOUR_API_KEY}&units=metric`;
      const response = await fetch(apiUrl);

      const data = await response.json();
     console.log(data.data);
      let imagePath = "";
      if (data.weather[0].main === "Clouds") {
        imagePath = cloud_icon;
      } else if (data.weather[0].main === "Clear") {
        imagePath = clearImage;
      } else if (data.weather[0].main === "Rain") {
        imagePath = rainyImage;
      } else if (data.weather[0].main === "Drizzle") {
        imagePath = drizzleImage;
      } else if (data.weather[0].main === "Wind") {
        imagePath = windImage;
      } else if (data.weather[0].main === "Snow") {
        imagePath = snow_icon;
      }
      setData({
        temp: data.main.temp,
        speed: data.wind.speed,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        visibility: data.visibility,
        name: data.name,
        image: imagePath,
      });
    } catch (err) {
      console.error("no data");
      // Set the default image on error
      setData({ ...data, image: cloud_icon });
    }
  }
  useEffect(() => {
    getData();
  }, []);
 
  const handleChange = (e) => {
    setName(e.target.value);
  
  };
  const handlerClick = () => {
    if (name !== "") {
      getData();
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && name.trim() !== "") {
      // Fetch data when Enter key is pressed
      getData(name);
    }
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
      <div className="wather-img">
        <img src={data.image} className="icon" alt="weather_icon" />
      </div>
      <div className="weather-temp">{data.temp.toFixed(2)}°C</div>
      <div className="weather-location">{data.name}</div>
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
    </div>
  );
};
export default Temperature;

