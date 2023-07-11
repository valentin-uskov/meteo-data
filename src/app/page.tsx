import { cities } from '@/cities'
import { getTodayCityWeather, getWeekCityWeather } from '@/api/openMeteo'
import { CityWeatherToday, CityWeatherWeek } from '@/models'
import Weather from '@/components/Weather'

async function getTodayCitiesWeather() {
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

async function getWeekCitiesWeather() {
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

export default async function Home() {
  const todayWeather = await getTodayCitiesWeather()
  const weekWeather = await getWeekCitiesWeather()

  return (
    <main>
      <Weather todayWeather={todayWeather} weekWeather={weekWeather} />
    </main>
  )
}
