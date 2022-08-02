import './scss/stayle.scss'

// const ipifyUrl =
//   'https://geo.ipify.org/api/v2/country,city?apiKey=at_xxGERdbJjZCIHWKQSyP09O9KZHXSs'

const submitBtn = document.getElementById('submit'),
  searchEl = document.getElementById('search'),
  ipifyFile = 'ipify.json',
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

      getMap(data.location.lat, data.location.lng)
    })
    .catch((err) => console.log('Error with status: ' + err))
}

function getMap(lat, lng) {
  let map = L.map('map', { zoomControl: false }).setView(
    [43.668544, 18.974854],
    13
  )

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map)
}

submitBtn.addEventListener('click', (e) => {
  e.preventDefault()

  console.log(searchEl.value)
  getLocation()
})
