import axios from "axios";
import { useEffect, useState } from "react";

const SingleCountry = ({ country }) => {
  const pictureStyle = {
    marginBottom: 0,
    marginTop: 0,
    fontSize: 200,
  };
  const [weather, setWeather] = useState([]);
  const [weatherIcon, setWeatherIcon] = useState([]);
  const languages = [Object.values(country.languages)][0];

  const getWeatherFromApi = () => {
    const params = {
      lat: country.capitalInfo.latlng[0],
      lon: country.capitalInfo.latlng[1],
      apiKey: process.env.REACT_APP_API_KEY,
      units: "metric",
    };
    console.log(params);

    axios
      .get("https://api.openweathermap.org/data/2.5/weather?", { params })
      .then((response) => {
        const apiResponse = [response.data];
        console.log(apiResponse);
        setWeather([response.data]);
        console.log(response.data);
        console.log(response.data.weather[0].icon);
        console.log(weather);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(weather);

  /* const getWeatherIcon = () => {
    const icon = weather.weather[0].icon;
    axios
      .get(`http://openweathermap.org/img/wn/${icon}@2x.png`)
      .then((response) => {
        setWeatherIcon(response.data);
        console.log(response);
      })

      .catch((error) => {
        console.log(error);
      });
  };
 */
  useEffect(() => {
    // getWeatherFromApi();
    // getWeatherIcon();
    const params = {
      lat: country.capitalInfo.latlng[0],
      lon: country.capitalInfo.latlng[1],
      apiKey: process.env.REACT_APP_API_KEY,
      units: "metric",
    };
    console.log(params);

    axios
      .get("https://api.openweathermap.org/data/2.5/weather?", { params })
      .then((response) => {
        const apiResponse = [response.data];
        console.log(apiResponse);
        setWeather([response.data]);
        setWeatherIcon(response.data.weather[0].icon);
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, [country]);
  console.log(weatherIcon);

  if (weather.length > 0) {
    return (
      <div>
        <h1>{country.name.common}</h1>

        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h2>languages:</h2>
        <ul>
          {languages.map((language) => (
            <li key={languages.indexOf(language)}>{language}</li>
          ))}
        </ul>
        <p style={pictureStyle}>{country.flag}</p>
        <h1>Weather in {country.capital[0]}</h1>
        <p>temperature {weather[0].main.temp} Celsius</p>
        <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="weather icon" />
        <p>Wind {weather[0].wind.speed} m/s</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>{country.name.common}</h1>

        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
        <h2>languages:</h2>
        <ul>
          {languages.map((language) => (
            <li key={languages.indexOf(language)}>{language}</li>
          ))}
        </ul>
        <p style={pictureStyle}>{country.flag}</p>
        <h1>Weather in {country.capital[0]}</h1>
      </div>
    );
  }
};

export default SingleCountry;
