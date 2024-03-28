import { Router, Request, Response, NextFunction } from 'express'
import { query, body, validationResult, oneOf, param } from 'express-validator'

import {
  createUser,
  updateUser,
  getUserByUUID,
  getUserBySession,
} from '../controllers/users'

const userCreateValidation = [
  body('firstName')
    .notEmpty()
    .withMessage('Body param [firstName] is required'),
  body('lastName').notEmpty().withMessage('Body param [lastName] is required'),
  body('email').notEmpty().withMessage('Body param [email] is required'),
  body('password').notEmpty().withMessage('Body param [password] is required'),
]

const userUpdateValidation = [
  param('uuid').notEmpty().withMessage('Query param [uuid] is required'),
  body('updateType')
    .notEmpty()
    .withMessage('Body param [updateType] is required'),
  oneOf([
    // When updating avatar
    body('avatarImageData').notEmpty(),
    // When updating profile information
    [
      body('firstName')
        .notEmpty()
        .withMessage('Body param [firstName] is required'),
      body('lastName')
        .notEmpty()
        .withMessage('Body param [lastName] is required'),
      body('email').notEmpty().withMessage('Body param [email] is required'),
    ],
    // When updating password
    [
      body('currentPassword')
        .notEmpty()
        .withMessage('Body param [currentPassword] is required'),
      body('newPassword')
        .notEmpty()
        .withMessage('Body param [newPassword] is required'),
      body('confirmNewPassword')
        .notEmpty()
        .withMessage('Body param [confirmNewPassword] is required'),
      body('newPassword')
        .equals('confirmNewPassword')
        .withMessage(
          'Values corresponding to body params [newPassword, confirmNewPassword] do not match'
        ),
    ],
  ]),
]

const userFindValidation = [
  query('uuid').notEmpty().withMessage('Query param [uuid] is required'),
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
