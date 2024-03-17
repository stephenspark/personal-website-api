import express, { Express, NextFunction, Request, Response } from 'express'
import session from 'express-session'

// routes
import authRoutes from './routes/auth'
import healthcheckRoutes from './routes/healthcheck'
import usersRoutes from './routes/users'

// libs
import passport from './libs/passport'
import mongoStore from './libs/mongoStore'

// middlewares
import { authenticationCheck } from './middlewares/auth'

// express setup
const app: Express = express()
const port = process.env.PORT || 3001
const cookieSameSite = process.env.NODE_ENV === 'development' ? 'lax' : 'none'
const cookieSecure = process.env.NODE_ENV === 'development' ? 'auto' : true

app.use(express.json())
app.use(
  session({
    store: mongoStore,
    resave: false,
    saveUninitialized: false,
    secret: `${process.env.SESSION_SECRET}`,
    proxy: true,
    cookie: {
      sameSite: cookieSameSite,
      secure: cookieSecure,
      maxAge: 1000 * 60 * 60 * 24 * 14,
    },
    unset: 'destroy',
  })
)

// passport
app.use(passport.initialize())
app.use(passport.session())

// use routes
app.use('/auth', authRoutes)
app.use('/healthcheck', healthcheckRoutes)
app.use('/users', authenticationCheck, usersRoutes)

// fallback central error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack)
  return res.status(500).send('Something went wrong!')
})

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`)
})
