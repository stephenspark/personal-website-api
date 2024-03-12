import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { User } from '../models/user'

const router = Router()
const users: User[] = []

const userValidationRules = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').notEmpty().withMessage('Email is required'),
]

const validationHandler = (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  return
}

router.post('/', userValidationRules, (req: Request, res: Response) => {
  validationHandler(req, res)

  const user: User = {
    id: users.length + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  }

  users.push(user)
  res.status(201).json(user)
})

router.put('/:id', userValidationRules, (req: Request, res: Response) => {
  validationHandler(req, res)

  const user = users.find((user) => user.id === parseInt(req.params.id))

  if (!user) {
    res.status(404).send('Task not found')
  } else {
    user.firstName = req.body.firstName || user.firstName
    user.lastName = req.body.lastName || user.lastName
    user.email = req.body.email || user.email

    res.json(user)
  }
})

router.delete('/:id', userValidationRules, (req: Request, res: Response) => {
  const index = users.findIndex((user) => user.id === parseInt(req.params.id))

  if (index === -1) {
    res.status(404).send('User not found')
  } else {
    users.splice(index, 1)
    res.status(204).send()
  }
})

router.get('/', userValidationRules, (req: Request, res: Response) => {
  res.json(users)
})

router.get('/:id', userValidationRules, (req: Request, res: Response) => {
  const user = users.find((user) => user.id === parseInt(req.params.id))

  if (!user) {
    res.status(404).send('User not found')
  } else {
    res.json(user)
  }
})

export default router
