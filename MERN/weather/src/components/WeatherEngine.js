import React, { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard/component";

const WeatherEngine = ({ location }) => {
  // init for our state variables
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [weather, setWeather] = useState({
    temp: null,
    city: null,
    condition: null,
    country: null,
  });

  const getWeather = async (q) => {
    setQuery("");
    setLoading(true);
    const app_id =
      "Please enter your app ID here from https://home.openweathermap.org/";
    try {
      const apiRes = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&APPID=${app_id}`
      );
      const resJSON = await apiRes.json();
      console.log("Main: " + resJSON.weather[0].main);
      setWeather({
        temp: resJSON.main.temp,
        city: resJSON.name,
        condition: resJSON.weather[0].main,
        country: resJSON.sys.country,
      });
    } catch (error) {
      console.log(
        "There is some error in calling the Open Weather Map API, please enter API key in WeatherEngine.js file"
      );
      setError(true);
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getWeather(query);
  };

  useEffect(() => {
    getWeather(location);
  }, [location]);

  return (
    <div className="App">
      {!loading && !error ? (
        <div>
          {" "}
          <WeatherCard
            temp={weather.temp}
            condition={weather.condition}
            city={weather.city}
            country={weather.country}
          />
          <form>
            <input value={query} onChange={(e) => setQuery(e.target.value)} />
            <button onClick={(e) => handleSearch(e)}>Search</button>
          </form>
        </div>
      ) : loading ? (
        <div style={{ color: "black" }}>loading</div>
      ) : !loading && error ? (
        <div>
          Error
          <br />
          <button onClick={() => setError(false)}>Reset!</button>
        </div>
      ) : null}
    </div>
  );
};

export default WeatherEngine;
