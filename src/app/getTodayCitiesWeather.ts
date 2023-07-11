import { City, CityWeatherToday } from '@/models'
import { getTodayCityWeather } from '@/api/openMeteo'

export const getTodayCitiesWeather = async (cities: City[]) => {
  const todayCitiesWeather: CityWeatherToday[] = []

  await Promise.all(cities.map(({ latitude, longitude }) => getTodayCityWeather(latitude, longitude)))
    .then((data) => {
      cities.forEach((city, index) => {
        todayCitiesWeather.push({
          id: city.id,
          city: city.name,
          country: city.country,
          temperatureMax: Math.round(+data[index].daily.temperature_2m_max[0]),
          temperatureMin: Math.round(+data[index].daily.temperature_2m_min[0]),
          windDirection: +data[index].daily.winddirection_10m_dominant[0],
        })
      })
    })
    .catch(console.log)

  return todayCitiesWeather
}
