const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3001;

// Middleware

// JSON parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

// CORS middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

//...
const jwt = require('jsonwebtoken');
const jwtSecret = "mysuperdupersecret"; // Use env for secrets
//...

// Auth middleware
app.use((req, res, next) => {
  // login does not require jwt verification
  if (req.path == '/api/login') {
    // next middleware
    return next()
  }

  // get token from request header Authorization
  const token = req.headers.authorization

  // Token verification
  try {
    var decoded = jwt.verify(token, jwtSecret);
    console.log("decoded", decoded)
  } catch (err) {
    // Catch the JWT Expired or Invalid errors
    return res.status(401).json({ "msg": err.message })
  }

  // next middleware
  next()
});

// Routes
app.get("/api/login", (req, res) => {
  console.log("hit");
  
  // generate a constant token, no need to be fancy here
  const token = jwt.sign({ "username": "Matt" }, jwtSecret, { expiresIn: 60 }) // 1 min token
  // return it back
  res.json({ "token": token })
});

app.get("/api/token/ping", (req, res) => {
  // Middleware will already catch if token is invalid
  // so if he can get this far, that means token is valid
  res.json({ "msg": "All valid!" })
})

app.get("/api/ping", (req, res) => {
  // random endpoint so that the client can call something
  res.json({ "msg": "pong" })
});


module.exports = app;
