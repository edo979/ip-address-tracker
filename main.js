import './scss/stayle.scss'
import { isIP } from 'is-ip'

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

      getMap(43.668544, 18.974854)
    })
    .catch((err) => console.log('Error with status: ' + err))
}

function getMap(lat, lng) {
  let map = L.map('map', { zoomControl: false }).setView([lat, lng], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map)

  L.marker([lat, lng], {
    icon: L.icon({
      iconUrl: './images/icon-location.svg',
      iconSize: [45, 55],
      iconAnchor: [22, 54],
    }),
  }).addTo(map)
}

submitBtn.addEventListener('click', (e) => {
  e.preventDefault()
  checkInput(searchEl.value)

  //getLocation()
})

function checkInput(userInput) {
  // check is ip address
  if (isIP(userInput)) {
    console.log('ip')
    return
  }
  //  or domain
  const reg = new RegExp(
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/
  )

  if (reg.test(userInput)) {
    console.log('domain')
    return
  }

  console.log('error input')
}
