import { City, CityWeatherWeek } from '@/models'
import { getWeekCityWeather } from '@/weatherApi/openMeteo'

export const getWeekCitiesWeather = async (cities: City[]) => {
  try {
    const response = await Promise.all(cities.map(({ latitude, longitude }) => getWeekCityWeather(latitude, longitude)))

    const weekCitiesWeather: CityWeatherWeek[] = cities.map((city, index) => ({
      id: city.id,
      city: city.name,
      country: city.country,
      dates: response[index].daily.time,
      temperature: response[index].daily.temperature_2m_max.map(
        (maxTemperature: number, i: number) => (maxTemperature + response[index].daily.temperature_2m_min[i]) / 2,
      ),
    }))

    return weekCitiesWeather
  } catch (e) {
    throw new Error('Unable to fetch week weather')
  }
}
