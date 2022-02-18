const request = require('request-promise-native')

const fetchMyIp = function() {
  return request('https://api.ipify.org?format=json')
}

const fetchCoordsByIp = function(body) {
  const ip = JSON.parse(body).ip
  return request(`https://api.freegeoip.app/json/${ip}?apikey=c6f0cee0-905f-11ec-aba1-dd575f89c309`)
}

const fetchISSFlyOverTimes = function(body) {
  const {latitude, longitude} = JSON.parse(body)
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`)
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIp()
    .then(fetchCoordsByIp)
    .then(fetchISSFlyOverTimes)
    .then(body => {
      const { response } = JSON.parse(body)
      return response
    })
};

module.exports = { nextISSTimesForMyLocation };