import { useEffect, useState } from "react";
import axios from "axios";
import formatTimeStamp from "../../../utils/formatTimeStamp";

const WeatherInfo = () => {
  // Use State
  const [weatherDaily, setweatherDaily] = useState([]);
  const [weatherCurrent, setweatherCurrent] = useState([]);
  const [weatherTimezone, setweatherTimezone] = useState([]);

  // Use effect
  useEffect(() => {
    getWeatherInfo();
  }, []);

  // Functions
  const getWeatherInfo = async () => {
    const openWeatherApiBaseUrl =
      "https://api.openweathermap.org/data/2.5/onecall?";
    const apiKey = "94b41ada67ac5b4e90e2b3a37d542f2b";
    const exclude = "minutely,hourly,alerts";
    const lat = 40.73061;
    const lon = -73.935242;

    let endpointUrl = `${openWeatherApiBaseUrl}lat=${lat}&lon=${lon}&`;
    endpointUrl += `exclude=${exclude}&appid=${apiKey}`;

    try {
      const res = await axios({
        method: "get",
        url: endpointUrl,
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.data);
      setweatherCurrent(res.data.current);
      console.log("response");
      setweatherDaily(res.data.daily);
      setweatherTimezone(res.data.timezone);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-box weather-info">
      {weatherCurrent.weather && (
        <>
          <div className="weather-current">
            <h2>Weather Info</h2>
            <p>City: {weatherTimezone}</p>
            <p>{weatherCurrent.weather[0].description}</p>
            <img
              className="weather-icon"
              src={`http://openweathermap.org/img/w/${weatherCurrent.weather[0].icon}.png`}
              alt=""
            />
            <p>{weatherCurrent.feels_like} °</p>
            <p>{formatTimeStamp(weatherCurrent.dt)}</p>
            <p>humidity: {weatherCurrent.humidity}%</p>
            <p>wind: {weatherCurrent.wind_speed}mph</p>
          </div>
          <ul className="weather-daily">
            {weatherDaily.map((day, index) => {
              if (index !== 7) {
                return (
                  <li key={index} className="weather-day">
                    <p className="day">{formatTimeStamp(day.dt, "day")}</p>
                    <img
                      className="weather-icon"
                      src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                      alt=""
                    />
                    <p> {day.weather[0].description}</p>
                    <p> {day.feels_like.day} °</p>
                    <p>wind: {day.wind_speed} mph</p>
                    <p>humidity: {day.humidity}%</p>
                  </li>
                );
              }
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default WeatherInfo;
