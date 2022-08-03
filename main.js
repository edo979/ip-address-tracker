import './scss/stayle.scss'
import { isIP } from 'is-ip'

const submitBtn = document.getElementById('submit'),
  searchEl = document.getElementById('search')
let inputParam = '',
  inputData = '',
  map = undefined,
  mapMarker = undefined

// event listener
submitBtn.addEventListener('click', (e) => {
  e.preventDefault()
  checkInput(searchEl.value)
})

async function getLocation() {
  //const url = 'ipify.json'
  const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_xxGERdbJjZCIHWKQSyP09O9KZHXSs&${inputParam}=${inputData}`

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      getMap(data.location.lat, data.location.lng)
      updateView(data)
    })
    .catch((err) => console.log('Error with status: ' + err))
}

function getMap(lat, lng) {
  if (map === undefined) {
    map = L.map('map', { zoomControl: false }).setView([lat, lng], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    mapMarker = L.marker([lat, lng], {
      icon: L.icon({
        iconUrl: './images/icon-location.svg',
        iconSize: [45, 55],
        iconAnchor: [22, 54],
      }),
    }).addTo(map)
  } else {
    map.flyTo([lat, lng], 13)
    mapMarker.setLatLng([lat, lng])
  }
}

function updateView(data) {
  const ipEl = document.getElementById('v-ip-address'),
    locationEl = document.getElementById('v-location'),
    timezoneEl = document.getElementById('v-timezone'),
    ispEl = document.getElementById('v-isp')

  ipEl.textContent = data.ip
  locationEl.textContent = `${data.location.region}, ${data.location.city}`
  timezoneEl.textContent = data.location.timezone
  ispEl.textContent = data.isp
}

function checkInput(userInput) {
  const msgErrorEl = document.querySelector('.error-msg'),
    reg = new RegExp(
      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/
    )
  let isInputValid = false

  if (!msgErrorEl.classList.contains('hidden'))
    msgErrorEl.classList.add('hidden')

  if (isIP(userInput)) {
    // check is ip address
    inputParam = 'ipAddress'
    isInputValid = true
  } else if (reg.test(userInput)) {
    //  or domain
    inputParam = 'domain'
    isInputValid = true
  }

  if (isInputValid) {
    inputData = userInput
    getLocation()
  } else {
    msgErrorEl.classList.remove('hidden')
  }
}
