import { Request, Response } from 'express'
import passport from 'passport'
import { User, UserModel } from '../../models/user'

interface Info {
  message: string
}

/** POST '/users/login' **/
const login = (req: Request, res: Response): void => {
  res.set('Access-Control-Allow-Origin', '*')

  const callback = function (err: Error, user: User, info: Info) {
    // Server Error
    if (err) {
      res.json({ status: 'server error' })
      return
    }
    // Auth Success
    if (user) {
      req.logIn(user, err => {
        if (err) {
          res.json({ status: 'server error' })
          return
        }

        res.json({ status: 'ok', username: user.username })
        return
      })
    }
    // Auth Failed
    res.json(info)
  }
  const authUser = passport.authenticate('user-login', callback)
  authUser(req, res)
}

export default login
