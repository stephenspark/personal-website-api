import { Router, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

import { localLogin, logout } from '../controllers/auth'

const loginValidation = [
  body('email').notEmpty().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required'),
]

const validationHandler = (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() })
  }
}

const router = Router()

router.post('/login/password', loginValidation, validationHandler, localLogin)
router.post('/logout', logout)

export default router
