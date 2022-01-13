import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
import { User, UserModel } from '../models/user'

// serializeUser(序列化)：登入成功時，把目前的user._id存入session中
passport.serializeUser((user, done) => {
  done(null, user)
})

// deserializeUser(反序列化)：到session中取出目前的user._id，並到資料庫裡找出對應的User物件實體
passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findOne({ _id: id })
    done(null, user)
  } catch (err) { done(err, false) }
})

/** Auth Strategies **/
class LoginStrategy {
  public use(role: string, name: string): void {
    passport.use(name, new LocalStrategy(async (username, password, done) => {
      try {
        const filter = {
          role: role,
          username: username
        }
        const user = await UserModel.findOne(filter)

        if (user) {
          const isValidPassword = (user: User, password: string): boolean => {
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

class RegisterStrategy {
  public use(role: string, name: string): void {
    passport.use(name, new LocalStrategy(async (username, password, done) => {
      try {
        const filter = {
          role: role,
          username: username
        }
        const user = await UserModel.findOne(filter)
        if (user) {
          done(null, false, { message: '此帳號已經註冊過囉！' })
          return
        }

        const userData = {
          role: role,
          username: username,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync())
        }
        const newUser = await UserModel.addNewUser(userData)
        done(null, newUser)
      } catch (err) { done(err) }
    }))
  }
}

interface Strategy {
  use: (role: string, name: string) => void
}

interface Context {
  [key: string]: Strategy
}

/** Strategies Context **/
const authStrategies: Context = {
  login: new LoginStrategy(),
  register: new RegisterStrategy()
}

/** Strategy Controller **/
const registerAuth = (type: string, role: string, name: string): void => {
  const strategy: Strategy = authStrategies[type]
  if (strategy) strategy.use(role, name)
}

registerAuth('login', 'user', 'user-login')
registerAuth('register', 'user', 'user-register')

export default passport
