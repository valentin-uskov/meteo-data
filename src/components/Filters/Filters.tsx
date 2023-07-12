import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react'
import Select, { MultiValue } from 'react-select'
import cn from 'classnames'

import { City, Filter } from '@/models'
import { generateOptionsFromCities } from '@/components/Filters/generateOptionsFromCities'
import { validateTemperature } from '@/components/Filters/validateTemperature'
import { SelectOption } from '@/components/Filters/models'

import styles from './Filters.module.scss'

type Props = {
  onChange: (filters: Filter) => void
  cities: City[]
}

const Filters: FC<Props> = ({ onChange, cities }) => {
  const [temperatureMin, setTemperatureMin] = useState<string>('')
  const [temperatureMax, setTemperatureMax] = useState<string>('')
  const [countries, setCountries] = useState<MultiValue<SelectOption>>([])
  const temperatureRegexp = new RegExp(/^-?(\d{1,2})?$/)

  const options = useMemo(() => generateOptionsFromCities(cities), [cities])
  const { isTemperatureMinValid, isTemperatureMaxValid, errorMessage } = useMemo(
    () => validateTemperature(temperatureMin, temperatureMax),
    [temperatureMin, temperatureMax],
  )

  const handleChangeTemperatureMin = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value

    if (temperatureRegexp.test(inputValue)) {
      setTemperatureMin(inputValue)
    }
  }

  const handleChangeTemperatureMax = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value

    if (temperatureRegexp.test(inputValue)) {
      setTemperatureMax(inputValue)
    }
  }

  useEffect(() => {
    onChange({
      countries: countries.map(({ value }) => value),
      temperatureMax:
        temperatureMax.length && isTemperatureMaxValid && !isNaN(+temperatureMax) ? +temperatureMax : null,
      temperatureMin:
        temperatureMin.length && isTemperatureMinValid && !isNaN(+temperatureMin) ? +temperatureMin : null,
    })
  }, [countries, temperatureMin, temperatureMax, isTemperatureMaxValid, isTemperatureMinValid])

  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        <Select
          value={countries}
          onChange={setCountries}
          placeholder="Max"
          classNamePrefix="select-inner"
          className={styles.multiSelect}
          options={options}
          isMulti
        />
        <input
          className={cn(styles.input, !isTemperatureMaxValid && styles.hasError)}
          type="text"
          placeholder="Max"
          value={temperatureMax}
          onChange={handleChangeTemperatureMax}
        />
        <input
          className={cn(styles.input, !isTemperatureMinValid && styles.hasError)}
          type="text"
          placeholder="Min"
          value={temperatureMin}
          onChange={handleChangeTemperatureMin}
        />
      </div>
      {!!errorMessage.length && <span className={styles.error}>{errorMessage}</span>}
    </div>
  )
}

export default Filters
