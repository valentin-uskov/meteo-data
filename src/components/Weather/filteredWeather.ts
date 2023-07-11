import { CityWeatherToday, CityWeatherWeek, Filter } from '@/models'

export const getFilteredTodayWeather = (todayWeather: CityWeatherToday[], filters: Filter) =>
  todayWeather.filter(({ country, temperatureMin, temperatureMax }) => {
    const temperatureMinFilter = filters.temperatureMin === null || temperatureMin >= filters.temperatureMin
    const temperatureMaxFilter = filters.temperatureMax === null || temperatureMax <= filters.temperatureMax
    const countriesFilter = !filters.countries.length || filters.countries.includes(country.toLowerCase())

    return countriesFilter && temperatureMinFilter && temperatureMaxFilter
  })

export const getFilteredWeekWeather = (weekWeather: CityWeatherWeek[], todayWeather: CityWeatherToday[]) =>
  weekWeather.filter(({ id }) => todayWeather.map(({ id }) => id).includes(id))
