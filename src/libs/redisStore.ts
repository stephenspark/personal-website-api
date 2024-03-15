import RedisStore from 'connect-redis'
import redis from './ioredis'

const redisStore = new RedisStore({
  client: redis,
  prefix: 'session:',
})

export default redisStore
