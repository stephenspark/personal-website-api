import { Router, Request, Response, NextFunction } from 'express'
import { body, validationResult } from 'express-validator'

import { localLogin, logout } from '../controllers/auth'

const loginValidation = [
  body('email').notEmpty().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required'),
]

const validationHandler = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  return next()
}

const router = Router()
  .post('/login/password', loginValidation, validationHandler, localLogin)
  .delete('/logout', logout)

export default router
