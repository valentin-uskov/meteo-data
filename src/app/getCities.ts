export const getCities = async () => {
  const response = await fetch(`${process.env.API_URL}/api/city`)

  if (!response.ok) throw new Error('Unable to fetch cities')

  return response.json()
}
