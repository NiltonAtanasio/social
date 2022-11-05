import express from 'express'
import userRoute from './src/routes/userRoute.js'
import connectDatabase from './src/database/db.js'
import dotenv from 'dotenv'
dotenv.config()

const port = process.env.PORT || 3000
const app = express()

connectDatabase()
app.use(express.json())
app.use('/user', userRoute)

app.listen(port, () => console.log(`servidor rodando na porta ${port}`))