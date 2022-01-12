import { Request, Response } from 'express'
import passport from 'passport'
import { User, UserModel } from '../models/user'

interface Info {
  message: string
}

export default {
  /** GET '/auth' **/
  index: async function (req: Request, res: Response): Promise<void> {
    try {
      const users = await UserModel.find({})
      res.json({ 'status': 'ok', users })
    } catch (err) {
      res.json({ 'status': 'mongodb error!' })
    }
  },

  /** POST '/auth/login' **/
  login: function (req: Request, res: Response): void {
    res.set('Access-Control-Allow-Origin', '*')

    const callback = function (err: Error, user: User, info: Info) {
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

  /** POST '/auth/sign-up' **/
  signUp: function (req: Request, res: Response) {
    res.set('Access-Control-Allow-Origin', '*')

    const callback = function (err: Error, user: User, info: Info) {
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
