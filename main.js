import './scss/stayle.scss'
import { get } from '/js/app'

const ipifyFile = 'ipify1.json'

get(ipifyFile)
  .then((data) => getLocation(data))
  .catch((err) => console.log('Error with status: ' + err))

function getLocation(data) {
  const lat = data.location.lat,
    lng = data.location.lng

  console.log('LAT: ', lat, 'LNG: ', lng)
}
