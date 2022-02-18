const { nextISSTimesForMyLocation } = require("./iss_promised");

const printPasses = (passes) => {
  for (let pass of passes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const { duration } = pass;

    console.log(`Next pass at ${datetime} for ${duration} seconds`);
  }
};

nextISSTimesForMyLocation()
  .then(printPasses)
