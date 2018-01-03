const mongoose    = require("mongoose");

const weatherSchema = new mongoose.Schema({
  date: {type: Date, default: Date.now},
  weather: [{
        main: String,
        description: String,
        icon: String
  }],
  main: {
    temp: Number,
    pressure: Number,
    humudity: Number,
    temp_min: Number,
    temp_max: Number
  },
  visibilty: Number,
  wind: {
    speed: Number,
    direction: Number
  },
  clouds: {all: Number}

})

module.exports = mongoose.model("weatherModel", weatherSchema);
