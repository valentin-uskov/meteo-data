export const getTodayCityWeather = async (latitude: string, longitude: string) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,winddirection_10m_dominant&timezone=auto&forecast_days=1`,
    )
    return response.json()
  } catch (e) {
    console.error(e)
  }
}
export const getWeekCityWeather = async (latitude: string, longitude: string) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto&past_days=7&forecast_days=0`,
    )
    return response.json()
  } catch (e) {
    console.error(e)
  }
}
