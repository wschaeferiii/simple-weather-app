import React, { Component } from 'react';
import { Container, Row , Col } from 'react-bootstrap';

import './App.css';

import { weatherApi, geolocationApi, forecastApi } from './api';
import {
  getRain1h,
  getSnow1h,
  getRain3h,
  getSnow3h,
  getWeatherResponseData,
  getWeatherStats,
  getWindSpeed,
  getWindDirection,
  getWeatherDesc,
  getSevenHoursForecast
} from './utils';

import { HourlyForecastComponent } from './HourlyForecastComponent';
import { WeatherComponent } from './WeatherComponent';


class App extends Component {

  componentDidMount(){
    geolocationApi().then((pos) => {

      Promise.all([weatherApi(pos), forecastApi(pos)])
      .then(([weatherRes, forecastRes]) => {

        const weatherData = getWeatherResponseData(weatherRes);
        const forecastData = getWeatherResponseData(forecastRes);
        const hourlyWeather = getSevenHoursForecast(forecastData);
        const stats = getWeatherStats(weatherData);
  
        this.setState(Object.assign({}, {
          isLoading: false,
          city: weatherData.name ? weatherData.name : 'Not Available',
          weatherDesc: getWeatherDesc(weatherData),
          feelsLike: stats.feels_like ? stats.feels_like : stats.errorMessage,
          humidity: stats.humidity ? stats.humidity : stats.errorMessage,
          pressure: stats.pressure ? stats.pressure : stats.errorMessage,
          temp: stats.temp ? stats.temp : stats.errorMessage,
          tempMax: stats.temp_max ? stats.temp_max : stats.errorMessage,
          tempMin: stats.temp_min ? stats.temp_min : stats.errorMessage,
          windSpeed: getWindSpeed(weatherData),
          windDirection: getWindDirection(weatherData),
          rain1h: getRain1h(weatherData),
          snow1h: getSnow1h(weatherData),
          rain3h: getRain3h(weatherData),
          snow3h: getSnow3h(weatherData),
          hourlyWeather
        }));

      })
    });
  }

  state = {
    isLoading: true,
    city: '',
    weatherDesc: '',
    feelsLike: '',
    humidity: '',
    pressure: '',
    temp: '',
    tempMax: '',
    tempMin: '',
    windSpeed: '',
    windDirection: '',
    rain3h: '',
    rain1h: '',
    snow3h: '',
    snow1h: '',
    hourlyWeather: []
  }

  render() {
    return (
      <Container className="App">
        {this.state.isLoading ? <h3>Loading...</h3> :
        <div>
          <Row>
            <Col>
              <WeatherComponent
                city={this.state.city}
                weatherDesc={this.state.weatherDesc}
                feelsLike={this.state.feelsLike}
                humidity={this.state.humidity}
                pressure={this.state.pressure}
                temp={this.state.temp}
                tempMax={this.state.tempMax}
                tempMin={this.state.tempMin}
                windSpeed={this.state.windSpeed}
                windDirection={this.state.windDirection}
                rainIn3={this.state.rainIn3}
                rainIn1={this.state.rainIn1}
                snowIn3={this.state.snowIn3}
                snowIn1={this.state.snowIn1}
              />
            </Col>
          </Row>
          <HourlyForecastComponent hourlyWeather={this.state.hourlyWeather} />
        </div>
        }
      </Container>
    );
  }
}

export default App;
