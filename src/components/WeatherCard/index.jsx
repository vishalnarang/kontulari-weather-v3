import React, { useState } from "react";
import styled from "styled-components";
import Moment from 'react-moment';
import './WeatherCard.css';
import cloudy from '../../assets/cloudy.gif';
import rain from '../../assets/rain.gif';
import sun from '../../assets/sun.gif';
import hot from '../../assets/hot.gif';
import foggy from '../../assets/foggy.gif';

const WeatherCard = (props) => {
    const [forecast] = useState(props.forecast);
    const weeklyWeatherReport = [];
    forecast.daily.forEach((value, index) => {
        const date = new Date();
        date.setDate(date.getDate() + index);
        value['date'] = formatDate(date, 'mm/dd/yy');
        if(value.weather[0].main === 'Rain'){
            value['image'] = rain;
        }
        else if(value.weather[0].main === 'Clouds'){
            value['image'] = cloudy;
        }
        else{
            value['image'] = sun;
        }

        weeklyWeatherReport.push(<div key={index}>
            <ul className="daily-list">
                <li>
                    <div className="daily-list-item">
                        <Moment format="DD/MM/YYYY">{value.date}</Moment>
                    </div>
                    <div className="daily-list-item">{value.weather[0].main}</div>
                    <div className="daily-list-item">
                        <img src={value.image} alt="Logo"  className="image"/>
                    </div>
                </li>
            </ul>
        </div>)
    })

    return (
        <Container>
            <h6 className="sub-heading">{forecast.timezone}</h6>
            <span className="sub-heading">{forecast.current.temp} &#176;C</span>
            <div className="d-flex">
                <div className="humidity-wind">
                    <p className="mb-10">Wind Speed</p>
                    <p className="mb-10">{forecast.current.wind_speed}</p>
                    <img src={foggy} alt="Logo"  className="image"/>
                </div>
                <div className="humidity-wind">
                    <p className="mb-10">Humidity</p>
                    <p className="mb-10">{forecast.current.humidity}</p>
                    <img src={hot} alt="Logo"  className="image"/>
                </div>
            </div>
            <Container className="daily-report">
                <div className="padding-tb10">Daily Weather Report</div>
                <Container className="d-flex daily-report-container">
                    {weeklyWeatherReport}
                </Container>
            </Container>
        </Container>
    );
};

function formatDate(date, format) {
    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        yy: date.getFullYear().toString().slice(-2),
        yyyy: date.getFullYear()
    }

    return format.replace(/mm|dd|yy|yyy/gi, matched => map[matched])
}


const Container = styled.div``;

export default WeatherCard;
