const express = require('express')
const app = express()
const userRoute = require('./src/routes/userRoute')
const port = 3000
const connectDatabase = require('./src/database/db')

connectDatabase()
app.use(express.json())
app.use('/user', userRoute)

app.listen(port, () => console.log(`servidor rodando na porta ${port}`))