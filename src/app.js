import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import routes from './routes/index.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use('/api', routes)

export default app
