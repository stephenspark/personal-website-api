import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import User from '../models/User'
import { validatePasswordMatch } from '../libs/bcrypt'

passport.serializeUser((user, done) => {
  done(null, user.uuid)
})

passport.deserializeUser(async (uuid: string, done) => {
  try {
    done(null, await User.findUserByUUID(uuid))
  } catch (err) {
    done(err)
  }
})

passport.use(
  new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findUserByEmail(email)
        if (
          user !== null &&
          (await validatePasswordMatch(password, user.encrypted_password))
        ) {
          return done(null, user)
        } else {
          return done(null, false)
        }
      } catch (e) {
        return done(e)
      }
    }
  )
)

export default passport
