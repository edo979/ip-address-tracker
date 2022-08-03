import './scss/stayle.scss'
import { isIP } from 'is-ip'

const submitBtn = document.getElementById('submit'),
  searchEl = document.getElementById('search')
let inputParam = '',
  inputData = '',
  map = undefined

// event listener
submitBtn.addEventListener('click', (e) => {
  e.preventDefault()
  checkInput(searchEl.value)
})

async function getLocation() {
  const url = 'ipify.json'
  //const url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_xxGERdbJjZCIHWKQSyP09O9KZHXSs&${inputParam}=${inputData}`

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      getMap(data.location.lat, data.location.lng)
    })
    .catch((err) => console.log('Error with status: ' + err))
}

function getMap(lat, lng) {
  map = L.map('map', { zoomControl: false }).setView([lat, lng], 13)

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

function checkInput(userInput) {
  const pEl = document.querySelector('.error-msg')

  if (!pEl.classList.contains('hidden')) pEl.classList.add('hidden')

  // check is ip address
  if (isIP(userInput)) {
    inputParam = 'ipAddress'
    inputData = userInput
    getLocation()
    return
  }
  //  or domain
  const reg = new RegExp(
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/
  )

  if (reg.test(userInput)) {
    inputParam = 'domain'
    inputData = userInput
    getLocation()
    return
  }

  // only show error
  pEl.classList.remove('hidden')
}
