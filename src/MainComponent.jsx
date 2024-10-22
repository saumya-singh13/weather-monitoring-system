"use client";
import React from "react";

function MainComponent() {
  const [weatherData, setWeatherData] = React.useState({});
  const [dailySummaries, setDailySummaries] = React.useState({});
  const [alerts, setAlerts] = React.useState([]);
  const [temperatureUnit, setTemperatureUnit] = React.useState("C");
  const [alertThreshold, setAlertThreshold] = React.useState(20); //threshold temperature 20 °C
  const cities = [
    "Delhi",
    "Mumbai",
    "Chennai",
    "Bangalore",
    "Kolkata",
    "Hyderabad",
  ];
  const apiKey = "aca3923050861116e0bf29d8d29d7511";
  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},IN&appid=${apiKey}`
      );
      const data = await response.json();
      return {
        city,
        main: data.weather[0].main,
        temp:
          temperatureUnit === "C"
            ? data.main.temp - 273.15
            : ((data.main.temp - 273.15) * 9) / 5 + 32,
        feels_like:
          temperatureUnit === "C"
            ? data.main.feels_like - 273.15
            : ((data.main.feels_like - 273.15) * 9) / 5 + 32,
        humidity: data.main.humidity,
        wind_speed: data.wind.speed,
        pressure: data.main.pressure,
        dt: data.dt,
      };
    } catch (error) {
      console.error(`Error fetching data for ${city}:`, error);
      return null;
    }
  };

  React.useEffect(() => {
    const fetchAllCitiesData = async () => {
      const newData = {};
      for (const city of cities) {
        const cityData = await fetchWeatherData(city);
        if (cityData) {
          newData[city] = cityData;
        }
      }
      setWeatherData(newData);
      updateDailySummaries(newData);
      checkAlertThresholds(newData);
    };

    fetchAllCitiesData();
    const interval = setInterval(fetchAllCitiesData, 60000); // 1 minute API call interval
    return () => clearInterval(interval);
  }, [temperatureUnit, alertThreshold]);

  const updateDailySummaries = (newData) => {
    const today = new Date().toISOString().split("T")[0];
    setDailySummaries((prevSummaries) => {
      const updatedSummaries = { ...prevSummaries };
      for (const city in newData) {
        if (!updatedSummaries[city]) {
          updatedSummaries[city] = {};
        }
        if (!updatedSummaries[city][today]) {
          updatedSummaries[city][today] = {
            temps: [],
            humidity: [],
            wind_speed: [],
            pressure: [],
            conditions: {},
          };
        }
        updatedSummaries[city][today].temps.push(newData[city].temp);
        updatedSummaries[city][today].humidity.push(newData[city].humidity);
        updatedSummaries[city][today].wind_speed.push(newData[city].wind_speed);
        updatedSummaries[city][today].pressure.push(newData[city].pressure);
        updatedSummaries[city][today].conditions[newData[city].main] =
          (updatedSummaries[city][today].conditions[newData[city].main] || 0) +
          1;
      }
      return updatedSummaries;
    });
  };

  const checkAlertThresholds = (newData) => {
    for (const city in newData) {
      if (newData[city].temp > alertThreshold) {
        setAlerts((prevAlerts) => [
          ...prevAlerts,
          `Alert: Temperature in ${city} exceeded ${alertThreshold}°${temperatureUnit} at ${new Date().toLocaleTimeString()}`,
        ]);
      }
    }
  };

  const getDominantCondition = (conditions) => {
    return Object.entries(conditions).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];
  };

  return (
    <div className="container mx-auto p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">
        Real-Time Weather Monitoring System
      </h1>
      <div className="mb-4">
        <label className="mr-2">Temperature Unit:</label>
        <select
          value={temperatureUnit}
          onChange={(e) => setTemperatureUnit(e.target.value)}
          className="border p-1"
        >
          <option value="C">Celsius</option>
          <option value="F">Fahrenheit</option>
        </select>
        <label className="ml-4 mr-2">Alert Threshold:</label>
        <input
          type="number"
          value={alertThreshold}
          onChange={(e) => setAlertThreshold(Number(e.target.value))}
          className="border p-1 w-16"
        />
        <span>°{temperatureUnit}</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cities.map((city) => (
          <div key={city} className="bg-blue-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{city}</h2>
            {weatherData[city] && (
              <div>
                <p>Condition: {weatherData[city].main}</p>
                <p>
                  Temperature: {weatherData[city].temp.toFixed(1)}°
                  {temperatureUnit}
                </p>
                <p>
                  Feels Like: {weatherData[city].feels_like.toFixed(1)}°
                  {temperatureUnit}
                </p>
                <p>Humidity: {weatherData[city].humidity}%</p>
                <p>Wind Speed: {weatherData[city].wind_speed} m/s</p>
                <p>Pressure: {weatherData[city].pressure} hPa</p>
                <p>
                  Last Updated:{" "}
                  {new Date(weatherData[city].dt * 1000).toLocaleTimeString()}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Daily Summaries</h2>
        {Object.entries(dailySummaries).map(([city, dateSummaries]) => (
          <div key={city} className="mb-4">
            <h3 className="text-lg font-medium">{city}</h3>
            {Object.entries(dateSummaries).map(([date, summary]) => (
              <div key={date} className="ml-4">
                <p>{date}:</p>
                <p>
                  Avg Temp:{" "}
                  {(
                    summary.temps.reduce((a, b) => a + b, 0) /
                    summary.temps.length
                  ).toFixed(1)}
                  °{temperatureUnit}
                </p>
                <p>
                  Max Temp: {Math.max(...summary.temps).toFixed(1)}°
                  {temperatureUnit}
                </p>
                <p>
                  Min Temp: {Math.min(...summary.temps).toFixed(1)}°
                  {temperatureUnit}
                </p>
                <p>
                  Avg Humidity:{" "}
                  {(
                    summary.humidity.reduce((a, b) => a + b, 0) /
                    summary.humidity.length
                  ).toFixed(1)}
                  %
                </p>
                <p>
                  Avg Wind Speed:{" "}
                  {(
                    summary.wind_speed.reduce((a, b) => a + b, 0) /
                    summary.wind_speed.length
                  ).toFixed(1)}{" "}
                  m/s
                </p>
                <p>
                  Avg Pressure:{" "}
                  {(
                    summary.pressure.reduce((a, b) => a + b, 0) /
                    summary.pressure.length
                  ).toFixed(1)}{" "}
                  hPa
                </p>
                <p>
                  Dominant Condition: {getDominantCondition(summary.conditions)}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Alerts</h2>
        <ul>
          {alerts.map((alert, index) => (
            <li key={index} className="text-red-600">
              {alert}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MainComponent;