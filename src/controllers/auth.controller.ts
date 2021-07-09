import { Request, Response } from 'express'
import passport from 'passport'
import { UserDoc } from '../models/user'

interface Info {
  message: string
}

export default {
  // POST '/auth/login'
  login: function (req: Request, res: Response): void {
    res.set('Access-Control-Allow-Origin', '*')

    const callback = function (err: Error, user: UserDoc, info: Info) {
      // Server Error
      if (err) {
        res.json({ status: 'server error' })
        return
      }
      // Auth Success
      if (user) {
        req.logIn(user, (err: Error) => {
          if (err) {
            res.json({ status: 'server error' })
            return
          }

          res.json({
            status: 'ok',
            username: user.username
          })
          return
        })
      }
      // Auth Failed
      res.json(info)
    }
    const authUser: Function = passport.authenticate('user-login', callback)
    authUser(req, res)
  },

  // POST 'auth/sign-up'
  signUp: function (req: Request, res: Response) {
    res.set('Access-Control-Allow-Origin', '*')

    const callback = function (err: Error, user: UserDoc, info: Info) {
      // Server Error
      if (err) {
        res.json({ status: 'server error' })
        return
      }
      // Auth Success
      if (user) {
        req.logIn(user, (err: Error) => {
          if (err) {
            res.json({ status: 'server error' })
            return
          }

          res.json({
            status: 'ok',
            username: user.username
          })
          return
        })
      }
      // Auth Falied
      res.json(info)
    }
    const authUser: Function = passport.authenticate('user-sign-up', callback)
    authUser(req, res)
  }
}
