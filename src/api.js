import axios from 'axios';

const getWeatherApi = 'https://api.openweathermap.org/data/2.5/weather?';
const getForecastAPi = 'https://api.openweathermap.org/data/2.5/onecall?'
const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

export function weatherApi(position) {

    const query = formWeatherCoordsQuery(position, WEATHER_API_KEY);

    return axios.get(query);

}

export function forecastApi(position) {

    const query = formForecastCoordsQuery(position, WEATHER_API_KEY);

    return axios.get(query);
}


export function geolocationApi() {
    
    return new Promise((resolve, reject) => {
        
        if ('geolocation' in navigator) {
            
            navigator.geolocation.getCurrentPosition((position) => {
                console.log('position', position)
                resolve(position);
            });
            
        } else {
            
            console.log('Not Available');
            reject(new Error('Not Available'));
            
        }
    });
}

function formForecastCoordsQuery(position, WEATHER_API_KEY) {
    return `${getForecastAPi}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${WEATHER_API_KEY}`;
}

function formWeatherCoordsQuery(position, WEATHER_API_KEY) {
    return `${getWeatherApi}lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${WEATHER_API_KEY}`;
}
