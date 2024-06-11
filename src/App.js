import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import React, { useState } from "react";

<h1> Weather App</h1>;

function App() {
  let [city, setCity] = useState("");
  let [text, setText] = useState(false);
  let [weather, setWeather] = useState({});

  function displayWeather(response) {
    setText(true);
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function displaySubmit(event) {
    event.preventDefault();
    let apiKey = "7746bdeabca928cfedcad71e52fd9d66";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }

  function showCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={displaySubmit}>
      <input
        type="search"
        placeholder="Enter a city.."
        onChange={showCity}
        id="form-input"
      />
      <input type="Submit" value="Search" id="search-button" />
    </form>
  );

  if (text) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}

export default App;
