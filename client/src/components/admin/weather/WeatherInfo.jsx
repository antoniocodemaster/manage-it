import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../layout/Loader";
import formatTimeStamp from "../../../utils/formatTimeStamp";

const WeatherInfo = () => {
  // Use State
  const [weatherDaily, setweatherDaily] = useState([]);
  const [weatherCurrent, setweatherCurrent] = useState([]);
  const [weatherTimezone, setweatherTimezone] = useState([]);

  // Use effect
  useEffect(() => {
    const fetchData = async () => {
      const userLocation = await getUserCurrentLocation();
      getWeatherInfo(userLocation);
    };
    fetchData();
  }, []);

  // Functions
  const getWeatherInfo = async (userLocation) => {
    let lat = userLocation.lat;
    let lon = userLocation.lon;
    if (userLocation) {
      lat = userLocation.lat;
      lon = userLocation.lon;
    } else {
      lat = 40.6643;
      lon = -73.9385;
    }
    const openWeatherApiBaseUrl =
      "https://api.openweathermap.org/data/2.5/onecall?";
    const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;
    const exclude = "minutely,hourly,alerts";
    let endpointUrl = `${openWeatherApiBaseUrl}lat=${lat}&lon=${lon}&`;
    endpointUrl += `exclude=${exclude}&appid=${apiKey}`;
    try {
      const res = await axios({
        method: "get",
        url: endpointUrl,
        headers: { "Content-Type": "application/json" },
      });
      setweatherCurrent(res.data.current);
      setweatherDaily(res.data.daily);
      setweatherTimezone(res.data.timezone);
    } catch (error) {
      console.warn(error);
    }
  };

  const getUserCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        // first function runs if user allows geo location
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        // second function runs if user reject geolocation
        (err) => {
          console.warn("ERROR(" + err.code + "): " + err.message);
          resolve(false);
        }
      );
    });
  };

  return (
    <div className="admin-box ag-4-4 weather-info">
      {weatherCurrent.weather ? (
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
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default WeatherInfo;
