const mongoose    = require("mongoose");
var currentdate = new Date();
var mmddyyyy =
           (currentdate.getMonth()+1)  + "/"
          + currentdate.getDate() + "/"
          + currentdate.getFullYear()

var time = currentdate.getHours() + ":"
            +  currentdate.getMinutes() + ":"
            + currentdate.getSeconds();
const weatherSchema = new mongoose.Schema({
  datetime: {
    date: {
      type: String,
      default: mmddyyyy
    },
    time: {
      type: String,
      default: time
    }
  },

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
  clouds: {
    all: Number
  }

})

module.exports = mongoose.model("weatherModel", weatherSchema);
