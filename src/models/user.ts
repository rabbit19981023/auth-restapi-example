import mongoose, { Schema, Model, Document } from 'mongoose'

export interface User {
  role: string,
  username: string,
  password: string
}

export interface UserDoc extends Document {
  role: string,
  username: string,
  password: string
}

// design a Schema for UserModel
const userSchema: Schema = new Schema({
  role: String,
  username: String,
  password: String
})

// compile our Schema into a Data Model
const UserModel: Model<UserDoc> = mongoose.model('User', userSchema)

/** UserModel APIs **/
const findOne = async function (filter: object): Promise<UserDoc | null> {
  return new Promise(async (resolve, reject) => {
    try {
      const user: UserDoc | null = await UserModel.findOne(filter)
      resolve(user)
    } catch (err) { reject(err) }
  })
}

const addNewUser = async function (newUser: User): Promise<UserDoc> {
  return new Promise((resolve, reject) => {
    const user: UserDoc = new UserModel(newUser)

    user.save((err: mongoose.CallbackError, userDoc: UserDoc) => {
      if (err) { reject(err) }
      resolve(userDoc)
    })
  })
}

export default {
  findOne: findOne,
  addNewUser: addNewUser
}
