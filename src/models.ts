export type CityWeatherToday = {
  id: string
  city: string
  country: string
  temperatureMin: number
  temperatureMax: number
  windDirection: number
}

export type CityWeatherWeek = {
  id: string
  city: string
  country: string
  dates: string[]
  temperature: number[]
}

export type City = {
  id: string
  name: string
  country: string
  latitude: string
  longitude: string
}

export type ChartDataItem = {
  label: string
  value: number
}

export type Filter = {
  countries: string[]
  temperatureMin: number | null
  temperatureMax: number | null
}
