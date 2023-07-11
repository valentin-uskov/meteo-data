import Weather from '@/components/Weather'
import { getTodayCitiesWeather } from '@/app/getTodayCitiesWeather'
import { getWeekCitiesWeather } from '@/app/getWeekCitiesWeather'
import { getCities } from '@/app/getCities'

const Home = async () => {
  const cities = await getCities()
  const todayWeather = await getTodayCitiesWeather(cities)
  const weekWeather = await getWeekCitiesWeather(cities)

  return (
    <main>
      <Weather cities={cities} todayWeather={todayWeather} weekWeather={weekWeather} />
    </main>
  )
}

export default Home
