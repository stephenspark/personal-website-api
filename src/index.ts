import express, { Express, NextFunction, Request, Response } from 'express'

// import routes
import usersRoutes from './routes/users'

const app: Express = express()
const port = process.env.PORT || 3001

app.use(express.json())

// use routes
app.use('/users', usersRoutes)

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World!' })
})

// fallback central error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).send('Something went wrong')
})

app.listen(port, async () => {
  console.log(`Server is running at http://localhost:${port}`)
})
