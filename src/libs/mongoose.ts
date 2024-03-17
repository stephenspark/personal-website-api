import mongoose from 'mongoose'
;(async () => {
  await mongoose.connect(`${process.env.MONGO_DB_CONNECTION_STRING}`)
})()

export default mongoose
