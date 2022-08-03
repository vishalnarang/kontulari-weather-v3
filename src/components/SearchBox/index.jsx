import React, { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import styled from "styled-components";

import data from "../../data";
import api from "../../services/api";

const SearchBox = (props) => {
  const [locations, setLocations] = useState([]);

  const key = "INSERT YOUR API KEY";

  const handleOnSelect = (location) => {
    props.setLoading(true);
    api
      .get(
        `/lat=${location.lat}&lon=${location.lon}&&units=metric&appid=${key}`
      )
      .then((forecast) => {
        props.setForecast(forecast.data);
        console.log(forecast);
        console.log(forecast.data);
      })
      .catch((error) => {
        console.error(erro);
      });
  };

  const handleOnSearch = async (string, results) => {
    const result = data.filter((location) => {
      return location.name.toLowerCase().includes(string.toLowerCase());
    });
    setLocations(result);
  };

  return (
    <Container>
      <ReactSearchAutocomplete
        items={locations}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        autofocus
        placeholder="Enter your location..."
      />
    </Container>
  );
};

const Container = styled.div`
  margin: 48px;
  text-align: center;
  & > *:first-child {
    margin: auto;
    width: 700px;
  }
`;

export default SearchBox;
