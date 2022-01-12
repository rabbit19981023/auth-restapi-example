import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import db from './config/db'
import passport from './config/passportAuth'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import authRoute from './routes/auth.route'

class Server {
  private app: express.Application

  constructor() {
    this.app = express()

    this.readEnv()
        .registerMiddlewares()
        .registerRouters()
        .dbConnection()
  }

  public listen(port: number | string, callback: () => void): void {
    this.app.listen(port, callback)
  }

  private readEnv(): this {
    dotenv.config()
    return this
  }

  private registerMiddlewares(): this {
    this.app.use(morgan('tiny'))

    this.app.use(express.json()) // parsing json data
    this.app.use(express.urlencoded({ extended: true })) // parsing form data

    this.app.use(session({
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: true,
      cookie: { maxAge: 600 * 1000 * 6 * 2 }, // 600milesec * 1000 * 6 = 1hr
      store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
    }))
    this.app.use(passport.initialize())
    this.app.use(passport.session())

    this.app.use(helmet())
    return this
  }

  private dbConnection(): this {
    db.connect()
    return this
  }

  private registerRouters(): this {
    this.app.use('/auth', authRoute)
    return this
  }
}

const server = new Server()
const PORT: string | number = process.env.PORT || 3000
server.listen(PORT, () => console.log(`The Server is Running at PORT: ${PORT}......`))
