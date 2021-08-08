import express from 'express'
import passport from './config/passportAuth'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import morgan from 'morgan'
import helmet from 'helmet'

/** Read in ENVs (development mode) **/
import dotenv from 'dotenv'
dotenv.config()

/** Database **/
import db from './config/db'

/** Routes **/
import authRoute from './routes/auth.route'

/** Main Express Application */
class Server {
  public app: express.Application

  /** Initializer **/
  public constructor() {
    this.app = express()
    this.config()
    this.registerRoutes()
    this.connectDb()
  }

  /** App Settings **/
  private config() {
    const app: express.Application = this.app

    app.use(morgan('tiny'))

    app.use(express.json()) // parsing json data
    app.use(express.urlencoded({ extended: true })) // parsing form data

    app.use(session({
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 600 * 1000 * 6 * 2 }, // 600milesec * 1000 * 6 = 1hr
      store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
    }))
    app.use(passport.initialize())
    app.use(passport.session())

    app.use(helmet())
  }

  /** DB Connecting **/
  private connectDb() {
    db.connect()
  }

  /** Routes **/
  private registerRoutes() {
    const app: express.Application = this.app

    app.use('/auth', authRoute)
  }
}

const app: express.Application = new Server().app
const PORT: string | number = process.env.PORT || 3000
app.listen(PORT, () => console.log(`The Server is Running at PORT: ${PORT}......`))
