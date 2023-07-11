import { FC } from 'react'

import { CityWeatherToday } from '@/models'

import styles from './WeatherTable.module.scss'

type Props = {
  citiesWeather: CityWeatherToday[]
  onCityClick: (cityId: string) => void
}

const WeatherTable: FC<Props> = ({ citiesWeather, onCityClick }) =>
  citiesWeather.length ? (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>City</th>
          <th>Temperature max</th>
          <th>Temperature min</th>
          <th>Wind direction</th>
        </tr>
      </thead>
      <tbody>
        {citiesWeather.map((cityWeather: CityWeatherToday) => (
          <tr key={cityWeather.id}>
            <td>
              <button className={styles.button} onClick={() => onCityClick(cityWeather.id)}>
                {cityWeather.city}
              </button>
            </td>
            <td>{cityWeather.temperatureMax}</td>
            <td>{cityWeather.temperatureMin}</td>
            <td>{cityWeather.windDirection}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <span className={styles.message}>Cities not found</span>
  )

export default WeatherTable
