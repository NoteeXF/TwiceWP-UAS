require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("../server/db");
const user = require("./routes/users");
const index = require("./routes/index")
const auth = require("./routes/auth");
const bodyParser = require('body-parser')

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


global.__basedir = __dirname;

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

index(app);
auth(app);
user(app);



let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
