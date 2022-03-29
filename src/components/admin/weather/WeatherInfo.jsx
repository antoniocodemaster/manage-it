import { useEffect, useState } from "react";
import axios from "axios";

const WeatherInfo = () => {
  // Use State
  const [weatherDaily, setweatherDaily] = useState([]);

  // Use effect
  useEffect(() => {
    getWeatherInfo();
  }, []);

  // Functions
  const getWeatherInfo = () => {
    const openWeatherApiBaseUrl =
      "https://api.openweathermap.org/data/2.5/onecall?";
    const apiKey = "94b41ada67ac5b4e90e2b3a37d542f2b";
    const exclude = "minutely,hourly,alerts";
    const lat = 40.73061;
    const lon = -73.935242;

    let endpointUrl = `${openWeatherApiBaseUrl}lat=${lat}&lon=${lon}&`;
    endpointUrl += `exclude=${exclude}&appid=${apiKey}`;

    axios({
      method: "get",
      url: endpointUrl,
      headers: { "Content-Type": "application/json" },
    })
      .then(({ data }) => {
        console.log(data);
        setweatherDaily(data.daily);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="admin-box">
      <h2>Weather Info</h2>
      <ul className="weather-daily">
        {weatherDaily.map((day, index) => {
          return (
            <li key={index}>
              <p>Time: {day.dt}</p>
              <p>Feels like: {day.feels_like.day}</p>
              <p>Wind Speed: {day.wind_speed}</p>
              <p>Clouds: {day.clouds}</p>
              <p>Rain: {day.rain}</p>
              <p>Snow: {day.snow}</p>
              <p>Humidity: {day.humidity}</p>
              <p>Description: {day.weather.description}</p>
              <p>Icon: {day.weather[0].icon}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default WeatherInfo;
