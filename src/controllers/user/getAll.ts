import { Request, Response } from 'express'
import { UserModel } from '../../models/user'

/** GET '/users' **/
const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserModel.find({})

    const parsedUsers = users.map(user => {
      return {
        role: user.role,
        username: user.username
      }
    })
    
    res.json({ 'status': 'ok', users: parsedUsers })
  } catch (err) {
    res.json({ 'status': 'mongodb error!' })
  }
}

export default getAll
