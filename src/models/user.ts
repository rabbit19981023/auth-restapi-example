import mongoose, { Schema, Model, ObjectId } from 'mongoose'

interface User {
  role: string,
  username: string,
  password: string
}

// design a Schema for UserModel
const userSchema = new Schema({
  role: String,
  username: String,
  password: String
})

// compile our Schema into a Data Model
const userModel = mongoose.model<User>('User', userSchema)

/** UserModel APIs **/
const find = async function (filter: object): Promise<User[] | null> {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await userModel.find(filter)
      resolve(users)
    } catch (err) { reject(err) }
  })
}

const findOne = async function (filter: object): Promise<User | null> {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await userModel.findOne(filter)
      resolve(user)
    } catch (err) { reject(err) }
  })
}

const addNewUser = async function (newUser: User): Promise<User> {
  return new Promise((resolve, reject) => {
    const user = new userModel(newUser)

    user.save((err: mongoose.CallbackError, userDoc: User) => {
      if (err) { reject(err) }
      resolve(userDoc)
    })
  })
}

const UserModel = {
  find,
  findOne,
  addNewUser
}

export { User, UserModel }
