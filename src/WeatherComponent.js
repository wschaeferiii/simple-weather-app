import React from 'react';
import Col from 'react-bootstrap/Col';

import { convertKelToFar, calculateCardinalDir } from './utils';

export function WeatherComponent(props) {

    return (
      <Col>
        <h1>City: {props.city}</h1>
        <h4>Current Weather: {props.weatherDesc}</h4>
        <p>Current Temperature: {convertKelToFar(props.temp)}º F</p>
        <p>Low: {convertKelToFar(props.tempMin)}º F</p>
        <p>High: {convertKelToFar(props.tempMax)}º F</p>
        <p>Feels Like: {convertKelToFar(props.feelsLike)}º F</p>
        <p>Wind: {props.windSpeed} mph {calculateCardinalDir(props.windDirection)}</p>
        {props.rain1h ? (
          <div>
            <p>Rain 1h: {props.rain1h} inches</p>
            <p>Rain 3h: {props.rain3h} inches</p>
          </div>
        ) : null}
        {props.snow1h ? (
          <div>
            <p>Snow 1h: {props.snow1h} inches</p>
            <p>Snow 3h: {props.snow3h} inches</p>
          </div>
        ) : null}
        <p>Humidity: {props.humidity}%</p>
        <p>Pressure: {props.pressure} hPa</p>
      </Col>
    )
  }
  