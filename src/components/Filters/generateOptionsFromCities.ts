import { City } from '@/models'
import { SelectOption } from '@/components/Filters/models'

export const generateOptionsFromCities = (cities: City[]) =>
  cities.reduce(
    (acc: SelectOption[], { country }) =>
      acc.some(({ value }) => value === country.toLowerCase())
        ? acc
        : [...acc, { label: country, value: country.toLowerCase() }],
    [],
  )
