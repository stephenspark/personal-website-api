import express, { Express, Request, Response } from 'express'

// routes
import authRoutes from './routes/auth'
import usersRoutes from './routes/users'

// libs
import passport from 'passport'

// middlewares
import { authenticationCheck } from './middlewares/auth'

const app: Express = express()
const port = process.env.PORT || 3001

app.use(express.json())

// passport
app.use(passport.initialize())
app.use(passport.session())

// use routes
app.use('/auth', authRoutes)
app.use('/users', authenticationCheck, usersRoutes)

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' })
})

// fallback central error handler
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack)
  res.status(500).send('Something went wrong')
})

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`)
})
