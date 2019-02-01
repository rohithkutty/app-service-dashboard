const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EnvironmentSchema = new Schema({
  release: {
    type: String,
    required: true
  },
  environment: {
    PUT: [],
    SIT: [],
    ST: []
  }
});

module.exports = Environment = mongoose.model("environment", EnvironmentSchema);
