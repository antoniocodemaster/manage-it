import { useEffect } from "react";
import axios from "axios";

const WeatherInfo = () => {
  useEffect(() => {
    getWeatherInfo();
  }, []);

  const getWeatherInfo = () => {
    const openWeatherApiBaseUrl =
      "https://api.openweathermap.org/data/2.5/weather?";
    const apiKey = "94b41ada67ac5b4e90e2b3a37d542f2b";
    const lat = 35;
    const long = 139;
    const endpointUrl = `${openWeatherApiBaseUrl}lat=${lat}&long=${long}&appid=${apiKey}`;
    axios({
      method: "get",
      url: endpointUrl,
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="admin-box">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem,
        officiis. Numquam non quam id ullam ratione amet est aliquam, odio vero
        accusamus dicta eligendi eum in sit. Rem, hic nesciunt?
      </p>
    </div>
  );
};

export default WeatherInfo;
