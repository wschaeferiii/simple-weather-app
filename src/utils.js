
export function calculateCardinalDir(degrees) {

    let dir;

    switch (true) {
        case (degrees > 348.75 && degrees < 11.25):
            dir = 'N'
            break;
    
        case (degrees > 11.25 && degrees < 33.75):
            dir = 'NNE'
            break;
    
        case (degrees > 33.75 && degrees < 56.25):
            dir = 'NE'
            break;
    
        case (degrees > 56.25 && degrees < 78.75):
            dir = 'ENE'
            break;
    
        case (degrees > 78.75 && degrees < 101.25):
            dir = 'E'
            break;
    
        case (degrees > 101.25 && degrees < 123.75):
            dir = 'ESE'
            break;
    
        case (degrees > 123.75 && degrees < 146.25):
            dir = 'SE'
            break;
    
        case (degrees > 146.25 && degrees < 168.75):
            dir = 'SSE'
            break;
    
        case (degrees > 168.75 && degrees < 191.25):
            dir = 'S'
            break;
    
        case (degrees > 191.25 && degrees < 213.75):
            dir = 'SSW'
            break;
    
        case (degrees > 213.75 && degrees < 236.25):
            dir = 'SW'
            break;
    
        case (degrees > 236.25 && degrees < 258.75):
            dir = 'WSW'
            break;
    
        case (degrees > 258.75 && degrees < 281.25):
            dir = 'W'
            break;
    
        case (degrees > 281.25 && degrees < 303.75):
            dir = 'WNW'
            break;
    
        case (degrees > 303.75 && degrees < 326.25):
            dir = 'NW'
            break;
    
        case (degrees > 326.25 && degrees < 348.75):
            dir = 'NNW'
            break;
        default:
            dir = '';
            break;

    }

    return dir;
}

export function getWeatherResponseData(response) {
    return response.data;
  }

export function getSevenHoursForecast(forecastData) {
    const sevenHours = [];
    for(let i = 0; i < 6; i++) {
      sevenHours.push({
        time: new Date(forecastData.hourly[i].dt * 1000).getHours(),
        temp: forecastData.hourly[i].temp,
        weatherDesc: getWeatherDesc(forecastData.hourly[i]),
        rain1h: getRain1h(forecastData.hourly[i]),
        snow1h: getSnow1h(forecastData.hourly[i])
      });
    }
    return sevenHours;
  }

  export function getWeatherStats(weatherData) {
    return weatherData && weatherData.main ? weatherData.main : { errorMessage: 'No weather information available.' };
  }

  export function getWindSpeed(weatherData) {
    return weatherData.wind && weatherData.wind.speed ? Math.floor(2.237 * weatherData.wind.speed) : '';
  }

  export function getWindDirection(weatherData) {
    return weatherData.wind && weatherData.wind.deg ? weatherData.wind.deg : '';
  }

  export function getSnow1h(weatherData) {
    return weatherData.snow && weatherData.snow['1h'] ? weatherData.snow['1h'] : '';
  }

  export function getSnow3h(weatherData) {
    return weatherData.snow && weatherData.snow['3h'] ? weatherData.snow['3h'] : '';
  }

  export function getRain1h(weatherData) {
    return weatherData.rain && weatherData.rain['1h'] ? weatherData.rain['1h'] : '';
  }

  export function getRain3h(weatherData) {
    return weatherData.rain && weatherData.rain['3h'] ? weatherData.rain['3h'] : '';
  }

  export function getWeatherDesc(weatherData) {
    return weatherData && weatherData.weather && Array.isArray(weatherData.weather)
      && weatherData.weather.length && weatherData.weather[0].description
    ? weatherData.weather[0].description
    : 'Weather description is not available';
  }

  export function convertKelToFar(temp){
    return Math.floor(1.8 * (temp - 273) + 32);
  }
  