import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { convertKelToFar } from './utils';

export function HourlyForecastComponent(props) {
    return (
        <Row>
            { props.hourlyWeather.length ? props.hourlyWeather.map((hour, i) => {
                return (
                    <Col key={i}>
                        <p><strong>Time: </strong>{hour.time}:00</p>
                        <p><strong>Weather: </strong>{hour.weatherDesc}</p>
                        <p><strong>Temp: </strong>{convertKelToFar(hour.temp)}º F</p>
                        { !hour.rain && !hour.snow ? <p>No precipitation forecasted.</p> : null}
                        { hour.rain ? <p><strong>Rain: </strong>{hour.rain1h}</p> : null }
                        { hour.snow ? <p><strong>Snow: </strong>{hour.snow1h}</p> : null }
                    </Col>
                )
            }) : null }
        </Row>
    )
}