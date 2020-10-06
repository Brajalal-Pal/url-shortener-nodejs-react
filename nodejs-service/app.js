const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
//const Sequelize = require("sequelize");
const connection = require("./utils/database");
const shortUrlRoute = require("./routes/shortUrl-route");
const ShortUrl = require("./models/shortUrl-model");
const ClientLocation = require("./models/client-location-model");

const PORT = 4000;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

ShortUrl.hasMany(ClientLocation);

//** Make it true first time only, to generate table structure in your database ***/
//** Warning: Data will be wiped-out if data structure/data already present ***/
connection.sync({ force: false });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(morgan("dev"));
app.use(shortUrlRoute);

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});
