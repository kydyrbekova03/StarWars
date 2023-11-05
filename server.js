const express = require('express')
const app = express()

const searchRouter = require('./routes/search')

app.use("/search", searchRouter)

app.listen(3000)