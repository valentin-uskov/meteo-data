import { City, CityWeatherWeek } from '@/models'
import { getWeekCityWeather } from '@/api/openMeteo'

export const getWeekCitiesWeather = async (cities: City[]) => {
  const weekCitiesWeather: CityWeatherWeek[] = []

  await Promise.all(cities.map(({ latitude, longitude }) => getWeekCityWeather(latitude, longitude)))
    .then((data) => {
      cities.forEach((city, index) => {
        weekCitiesWeather.push({
          id: city.id,
          city: city.name,
          country: city.country,
          dates: data[index].daily.time,
          temperature: data[index].daily.temperature_2m_max.map(
            (maxTemperature: number, i: number) => (maxTemperature + data[index].daily.temperature_2m_min[i]) / 2,
          ),
        })
      })
    })
    .catch(console.log)

  return weekCitiesWeather
}
