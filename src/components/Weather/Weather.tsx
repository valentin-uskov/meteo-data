'use client'
import { FC, useMemo, useState } from 'react'

import { INITIAL_FILTERS } from '@/components/Weather/constants'
import { CityWeatherToday, CityWeatherWeek, Filter } from '@/models'
import { generateChartData } from '@/components/Weather/generateChartData'
import { getFilteredTodayWeather, getFilteredWeekWeather } from '@/components/Weather/filteredWeather'
import Table from '@/components/Table'
import Chart from '@/components/Chart'
import Filters from '@/components/Filters'

import styles from './Weather.module.scss'

type Props = {
  todayWeather: CityWeatherToday[]
  weekWeather: CityWeatherWeek[]
}

const Weather: FC<Props> = ({ todayWeather, weekWeather }) => {
  const [filters, setFilters] = useState<Filter>(INITIAL_FILTERS)
  const [chartCityId, setChartCityId] = useState<string | null>(null)

  const filteredTodayWeather = useMemo(() => getFilteredTodayWeather(todayWeather, filters), [todayWeather, filters])
  const filteredWeekWeather = useMemo(
    () => getFilteredWeekWeather(weekWeather, filteredTodayWeather),
    [weekWeather, filteredTodayWeather],
  )
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
        <Chart data={chartData} chartCityId={chartCityId} clearChartCityId={() => setChartCityId(null)} />
      </div>
      <div className={styles.pane}>
        <Filters onChange={handleFilterChange} />
        <Table citiesWeather={filteredTodayWeather} onCityClick={setChartCityId} />
      </div>
    </div>
  )
}

export default Weather
