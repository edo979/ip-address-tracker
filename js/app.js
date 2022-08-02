const ipifyUrl =
  'https://geo.ipify.org/api/v2/country,city?apiKey=at_xxGERdbJjZCIHWKQSyP09O9KZHXSs'

async function get(url) {
  const response = await fetch(url)
  const resData = await response.json()
  return resData
}
