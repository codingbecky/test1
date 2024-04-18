const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')

const app = express()
app.use(express.json())

//port
const PORT = process.env.PORT || 5500

app.use(cors())

//connect to mongodb

mongoose.connect(process.env.DATABASE_URI, {useNewUrlParser: true})
    .then(console.log('Connected to mongodb!'))
    .catch(err => console.log(err))

//require the route file
const todoRouter = require("./routes/todoRoutes");

app.use("/todos", todoRouter);


//add port to connect server
app.listen(PORT, () => console.log(`Server connected on ${PORT}`));