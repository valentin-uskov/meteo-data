import { City, CityWeatherToday } from '@/models'
import { getTodayCityWeather } from '@/weatherApi/openMeteo'

export const getTodayCitiesWeather = async (cities: City[]) => {
  try {
    const response = await Promise.all(
      cities.map(({ latitude, longitude }) => getTodayCityWeather(latitude, longitude)),
    )

    const todayCitiesWeather: CityWeatherToday[] = cities.map((city, index) => ({
      id: city.id,
      city: city.name,
      country: city.country,
      temperatureMax: Math.round(+response[index].daily.temperature_2m_max[0]),
      temperatureMin: Math.round(+response[index].daily.temperature_2m_min[0]),
      windDirection: +response[index].daily.winddirection_10m_dominant[0],
    }))

    return todayCitiesWeather
  } catch (e) {
    throw new Error('Unable to fetch today weather')
  }
}
