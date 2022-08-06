import React, { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import styled from "styled-components";
import data from "../../data";
import api from "../../services/api";

const SearchBox = (props) => {
  const [locations, setLocations] = useState([]);

  const key = "1af64714ce5aed068b935bcab6a506c9";

  const handleOnSelect = (location) => {
    props.setLoading(true);
    api
      .get(
        `onecall?lat=${location.lat}&lon=${location.lon}&&units=metric&appid=${key}`
      )
      .then((forecast) => {
        props.setForecast(forecast.data);
        props.setLoading(false);
      })
      .catch((error) => {
        console.error(error);
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
  @media screen and (max-width: 767px){
    margin: 20px;
  }
  & > *:first-child {
    margin: auto;
    width: 700px;
    @media screen and (max-width: 767px){
      width: 100%;
    }
  }
`;

export default SearchBox;
