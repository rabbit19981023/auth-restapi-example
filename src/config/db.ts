import mongoose from 'mongoose'

export default {
  connect: async function (): Promise<void> {
    const config = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    }

    try {
      await mongoose.connect(process.env.MONGODB_URI || 'Not found in ENV!!', config)
      console.log('Connecting to Database Successfully!')
    } catch (err) { console.error(err) }
  }
}
