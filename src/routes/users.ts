import { Router, Request, Response, NextFunction } from 'express'
import { query, body, validationResult } from 'express-validator'

import {
  createUser,
  updateUser,
  getUserByUUID,
  getUserBySession,
} from '../controllers/users'

const userCreateValidation = [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').notEmpty().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required'),
]

const userUpdateValidation = [
  query('uuid').notEmpty().withMessage('UUID is required'),
]

const userFindValidation = [
  query('uuid').notEmpty().withMessage('UUID is required'),
]

const validationHandler = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  return next()
}

const router = Router()
  .post('/', userCreateValidation, validationHandler, createUser)
  .put('/:uuid', userUpdateValidation, validationHandler, updateUser)
  .get('/:uuid', userFindValidation, getUserByUUID)
  .get('/session/user', getUserBySession)

export default router
