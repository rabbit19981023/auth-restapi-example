import mongoose, { Schema, Model } from 'mongoose'

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
const find = async (filter: object): Promise<User[]> => {
  try {
    const users = await userModel.find(filter)
    return Promise.resolve(users)
  } catch (err) { return Promise.reject(err) }
}

const findOne = async (filter: object): Promise<User | null> => {
  try {
    const user = await userModel.findOne(filter)
    return Promise.resolve(user)
  } catch (err) { return Promise.reject(err) }
}

const addNewUser = async (newUser: User): Promise<User> => {
  const user = new userModel(newUser)

  try {
    const userDoc = await user.save()
    return Promise.resolve(userDoc)
  } catch (err) { return Promise.reject(err) }
}

const UserModel = {
  find,
  findOne,
  addNewUser
}

export { User, UserModel }
