/***********************************************
 * @author: James Abiagam (fabiagam@gmail.com)
 * @property: Live Fashion Sale Backend
 * @file: app.js
 * @name : Fashion API
 ************************************************/
 "use strict";
 const path = require("path");
 require("dotenv").config({ path: path.join(__dirname, "./.env") });
 const express = require("express");
 const cors = require("cors");
 const helmet = require("helmet");
 const bodyParser = require("body-parser");
 const morgan = require("morgan");
 const db = require("./models/");
 const routes = require("./routes/index");

 const app = express();
 const PORT = 6000;
const SERVER = "127.0.0.1";

// Enable CORS
app.use(cors());
app.use(helmet());
if(process.env.NODE_ENV !== 'test') {
 app.use(morgan("combined"));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// CORS pre-flight
app.options("*", cors());
app.set("trust proxy", 1);

//Connect and Sync DB
db.sequelize.sync().then(function() {
    console.log('Connected to SQlite database')
}).catch(function(err) {
    console.log(err)
});

routes(app);
app.get("/", (req, res) => {
    res.status(200).json({message:"Welcome to  our Fashion Live API Service!"});
  });
  
  app.listen(PORT, () => {
    console.info(
      `Fashion Live Service listening at http://${SERVER}:${PORT} `
    );
  });
  
  module.exports = app;