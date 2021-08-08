import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
import UserModel, { UserDoc } from '../models/user'

// the way to fix typeError on user._id
declare global {
  namespace Express {
    interface User extends UserDoc { }
  }
}

// serializeUser(序列化)：登入成功時，把目前的user._id存入session中
passport.serializeUser((user: Express.User, done: Function) => {
  done(null, user._id)
})

// deserializeUser(反序列化)：到session中取出目前的user._id，並到資料庫裡找出對應的User物件實體
passport.deserializeUser(async (id: string, done: Function) => {
  try {
    const user: UserDoc | null = await UserModel.findOne({ _id: id })
    done(null, user)
  } catch (err) { done(err, false) }
})

/** Custom Interface **/
interface Strategy {
  use: Function // Object Method
}

interface Context {
  [key: string]: Strategy
}

/** Auth Strategies **/
class LoginStrategy {
  public use (role: string, name: string): void {
    passport.use(name, new LocalStrategy(async (username: string, password: string, done: Function) => {
      try {
        const filter = {
          role: role,
          username: username
        }
        const user: UserDoc | null = await UserModel.findOne(filter)

        if (user) {
          const isValidPassword = function (user: UserDoc, password: string): boolean {
            return bcrypt.compareSync(password, user.password)
          }
  
          if (isValidPassword(user, password)) {
            done(null, user)
            return
          }

          done(null, false, { message: '密碼錯誤，請重新輸入！' })
          return
        }

        done(null, false, { message: '帳號不存在，請重新輸入！' })
      } catch (err) { done(err) }
    }))
  }
}

class SignUpStrategy {
  public use (role: string, name: string): void {
    passport.use(name, new LocalStrategy(async (username: string, password: string, done: Function) => {
      try {
        const filter = {
          role: role,
          username: username
        }
        const user: UserDoc | null = await UserModel.findOne(filter)
        if (user) {
          done(null, false, { message: '此帳號已經註冊過囉！' })
          return
        }

        const userData = {
          role: role,
          username: username,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync())
        }
        const newUser: UserDoc = await UserModel.addNewUser(userData)
        done(null, newUser)
      } catch (err) { done(err) }
    }))
  }
}

/** Strategies Context **/
const authStrategies: Context = {
  login: new LoginStrategy(),
  signUp: new SignUpStrategy()
}

/** Strategy Controller **/
const registerAuth = function (type: string, role: string, name: string): void {
  const strategy: Strategy = authStrategies[type]
  strategy.use(role, name)
}

registerAuth('login', 'user', 'user-login')
registerAuth('signUp', 'user', 'user-sign-up')

export default passport
