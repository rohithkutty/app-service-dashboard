const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const environments = require("./routes/api/environments");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true }).catch(err => console.log(err));

// Use Routes
app.use("/api/environments", environments);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
