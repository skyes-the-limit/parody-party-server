import express from 'express'
import session from 'express-session'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'

import usersController from './controllers/users-controller.js'
import searchController from './controllers/search-controller.js'

const app = express()

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/parody-party'
mongoose.connect(CONNECTION_STRING)

app.use(cors(
  // {
  //   credentials: true,
  //   origin: 'http://localhost:3000'
  // }
))
app.use(session({
  secret: 'SECRETO',
  cookie: { secure: false }
}))
app.use(express.json())

usersController(app)
searchController(app)

app.listen(process.env.PORT || 4000)
