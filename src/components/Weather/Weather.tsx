'use client'
import { FC, useMemo, useState } from 'react'

import { INITIAL_FILTERS } from '@/components/Weather/constants'
import { City, CityWeatherToday, CityWeatherWeek, Filter } from '@/models'
import { generateChartData } from '@/components/Weather/generateChartData'
import { getFilteredTodayWeather, getFilteredWeekWeather } from '@/components/Weather/filteredWeather'
import WeatherTable from '@/components/WeatherTable'
import Chart from '@/components/Chart'
import Filters from '@/components/Filters'

import styles from './Weather.module.scss'

type Props = {
  cities: City[]
  todayWeather: CityWeatherToday[]
  weekWeather: CityWeatherWeek[]
}

const Weather: FC<Props> = ({ cities, todayWeather, weekWeather }) => {
  const [filters, setFilters] = useState<Filter>(INITIAL_FILTERS)
  const [chartCityId, setChartCityId] = useState<string | null>(null)

  const filteredTodayWeather = getFilteredTodayWeather(todayWeather, filters)
  const filteredWeekWeather = getFilteredWeekWeather(weekWeather, filteredTodayWeather)

  const chartData = useMemo(
    () => generateChartData(filteredWeekWeather, chartCityId),
    [filteredWeekWeather, chartCityId],
  )

  const handleFilterChange = (filters: Filter) => {
    setFilters(filters)
    setChartCityId(null)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.pane}>
        <Chart
          data={chartData}
          cities={cities}
          chartCityId={chartCityId}
          clearChartCityId={() => setChartCityId(null)}
        />
      </div>
      <div className={styles.pane}>
        <Filters onChange={handleFilterChange} cities={cities} />
        <WeatherTable citiesWeather={filteredTodayWeather} onCityClick={setChartCityId} />
      </div>
    </div>
  )
}

export default Weather
