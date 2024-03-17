import MongoStore from 'connect-mongo'

const mongoStore = MongoStore.create({
  mongoUrl: `${process.env.MONGO_DB_CONNECTION_STRING}`,
  dbName: 'session-store',
})

export default mongoStore
