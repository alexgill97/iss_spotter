const { nextISSTimesForMyLocation } = require('./iss');

const printPasses = (passes) => {
  for (let pass of passes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const { duration } = pass;

    console.log(`Next pass at ${datetime} for ${duration} seconds`);
  }
};



nextISSTimesForMyLocation((error, results) => {
  if (error) {
    console.log("It didn't work", error);
    return;
  }

  printPasses(results);
});