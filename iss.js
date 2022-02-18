const request = require("request");

const url = 'https://api.ipify.org?format=json';

const fetchMyIP = function(callback) {
  request(url, (err, response, body) => {
    if (err) callback(err, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    
    const data = JSON.parse(body).ip;
    return callback(null, data);
  });
};

const fetchCoordsByIp = function(ip, callback) {
  request(`https://api.freegeoip.app/json/${ip}?apikey=c6f0cee0-905f-11ec-aba1-dd575f89c309`, (err, response, body) => {
    if (err) callback(err, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function({latitude, longitude}, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`, (err, response, body) => {
    if (err) callback(err, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const data = JSON.parse(body);
    const times = data.response;
    callback(null, times);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
  
    fetchCoordsByIp(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }
  
      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }
    
        callback(null, nextPasses);
      });
    });
  });
};



module.exports = { nextISSTimesForMyLocation };