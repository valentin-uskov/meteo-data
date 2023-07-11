import { ChartDataItem, CityWeatherWeek } from '@/models'

export const generateChartData = (weekWeather: CityWeatherWeek[], chartCityId: string | null): ChartDataItem[] => {
  const filteredWeekWeather = weekWeather.filter(({ id }) => id === chartCityId || !chartCityId)

  return filteredWeekWeather.length
    ? filteredWeekWeather[0].dates.map(
        (dateString, index): ChartDataItem => ({
          label: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(new Date(dateString)),
          value:
            filteredWeekWeather.reduce((acc, item) => {
              acc += item.temperature[index]
              return acc
            }, 0) / filteredWeekWeather.length,
        }),
      )
    : []
}
