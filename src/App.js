import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBox from "./components/SearchBox";
import api from "./services/api";
import WeatherCard from "./components/WeatherCard";
import DarkMode from "./components/DarkMode";
import './darkTheme.css';

function App() {
  const [forecast, setForecast] = useState({});
  const [loading, setLoading] = useState(true);
  const key = "1af64714ce5aed068b935bcab6a506c9";

  useEffect(() => {
    if (Object.keys(forecast).length === 0) {
      api
        .get(`onecall?lat=-12.9704&lon=-38.5124&&units=metric&appid=${key}`)
        .then((forecast) => {
          setForecast(forecast.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [forecast]);
  const Weather =
    loading || Object.keys(forecast).length === 0 ? (
      <h1>Loading...</h1>
    ) : (
      <WeatherCard forecast={forecast} />
    );

  return (
    <Container className="app-container">
      <DarkMode />
      <div className="dis-flex">
        <h1 className="heading">Kontulari Weather</h1>
        <SearchBox setForecast={setForecast} setLoading={setLoading} />
      </div>

      {Weather}
    </Container>
  );
}

const Container = styled.div`
`;

export default App;
