// const ipifyUrl =
//   'https://geo.ipify.org/api/v2/country,city?apiKey=at_xxGERdbJjZCIHWKQSyP09O9KZHXSs'

export async function get(url) {
  const response = await fetch(url)

  if (response.ok) {
    return await response.json()
  } else {
    return Promise.reject(response.status)
  }
}
