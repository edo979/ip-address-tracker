import './scss/stayle.scss'

// const ipifyUrl =
//   'https://geo.ipify.org/api/v2/country,city?apiKey=at_xxGERdbJjZCIHWKQSyP09O9KZHXSs'

const ipifyFile = 'ipify.json',
  locationData = { lat: undefined, lng: undefined }

export async function get(url) {
  const response = await fetch(url)

  if (response.ok) {
    return await response.json()
  } else {
    return Promise.reject(response.status)
  }
}

function getLocation() {
  get(ipifyFile)
    .then((data) => {
      locationData.lat = data.location.lat
      locationData.lng = data.location.lng

      console.log(locationData)
    })
    .catch((err) => console.log('Error with status: ' + err))
}

getLocation()
