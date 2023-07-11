export const validateTemperature = (temperatureMin: string, temperatureMax: string) => {
  let errorMessage = ''
  let isTemperatureMaxValid = true
  let isTemperatureMinValid = true

  if (temperatureMax.length && temperatureMin && +temperatureMax < +temperatureMin) {
    errorMessage = 'The maximum temperature cannot be lower than the minimum'
    isTemperatureMaxValid = false
    isTemperatureMinValid = false
  }

  if (temperatureMax.length && +temperatureMax > 80) {
    errorMessage = 'The maximum temperature cannot be higher than 80'
    isTemperatureMaxValid = false
  }

  if (temperatureMax.length && +temperatureMax < -80) {
    errorMessage = 'The maximum temperature cannot be lower than -80'
    isTemperatureMaxValid = false
  }

  if (temperatureMin.length && +temperatureMin > 80) {
    errorMessage = 'The minimum temperature cannot be higher than 80'
    isTemperatureMinValid = false
  }

  if (temperatureMin.length && +temperatureMin < -80) {
    errorMessage = 'The minimum temperature cannot be lower than -80'
    isTemperatureMinValid = false
  }

  return { isTemperatureMinValid, isTemperatureMaxValid, errorMessage }
}
