import { Request, Response } from 'express'
import passport from 'passport'
import { User, UserModel } from '../../models/user'

interface Info {
  message: string
}

/** POST '/users/sign-up' **/
const register = (req: Request, res: Response) => {
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
    // Auth Falied
    res.json(info)
  }
  const authUser = passport.authenticate('user-register', callback)
  authUser(req, res)
}

export default register
