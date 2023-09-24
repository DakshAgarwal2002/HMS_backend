const connectToMongo = require('./db');
const express = require('express')
const logger = require("morgan");
const cors = require("cors");
const router = express.Router();

connectToMongo();
const app = express()
const port = process.env.PORT || 5000

app.use(logger("dev"));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.use('/api/auth', require('./routes/auth'))
app.listen(port, () => {
    console.log(`Backend is working fine at http://localhost:${port}`)
  })