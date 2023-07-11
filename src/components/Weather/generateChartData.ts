import { ChartDataItem, CityWeatherWeek } from '@/models'

export const generateChartData = (weekWeather: CityWeatherWeek[], chartCityId: string | null) => {
  const chartData: ChartDataItem[] = []
  const filteredWeekWeather = weekWeather.filter(({ id }) => id === chartCityId || !chartCityId)

  if (filteredWeekWeather.length) {
    filteredWeekWeather[0].dates.forEach((dateString, index) => {
      const date = new Date(dateString)

      chartData.push({
        label: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
        value:
          filteredWeekWeather.reduce((acc, item) => {
            acc += item.temperature[index]
            return acc
          }, 0) / filteredWeekWeather.length,
      })
    })
  }

  return chartData
}
