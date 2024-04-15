import { Request, Response } from 'express'

import User from '../models/User'
import { validatePasswordMatch } from '../libs/bcrypt'

export async function createUser(req: Request, res: Response) {
  if (await User.findUserByEmail(req.body.email)) {
    res
      .status(409)
      .json({ message: 'A user with this email address already exists!' })
  }

  const user = await User.createUser(
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.password
  )

  if (!user) {
    res.status(201).json(user)
  } else {
    res.status(500).json({ message: 'Something went wrong!' })
  }
}

export async function updateUser(req: Request, res: Response) {
  let user = await User.findUserByUUID(req.params.uuid)

  if (!user) {
    res.status(404).send('User not found')
  } else {
    switch (req.body.updateType) {
      case 'updateAvatar':
        // Have the file upload, compression, etc. happen in a Lambda async, but wait on the results here to update DB with URL
        res.status(200).json(user)
        break
      case 'updateInformation':
        // Break this out so that the controller can accept an object with named keys so I don't have to pad with undefineds...
        user = await User.updateUser(
          req.params.uuid,
          req.body.firstName,
          req.body.lastName,
          req.body.email
        )
        res.status(200).json(user)
        break
      case 'updatePassword':
        // Verify that current password supplied matches existing user current password
        if (
          !(await validatePasswordMatch(
            req.body.currentPassword,
            user.encrypted_password
          ))
        ) {
          res.status(400).json({
            message:
              'Current password supplied does not match password on file',
          })
          break
        }
        user = await User.updateUser(
          req.params.uuid,
          undefined,
          undefined,
          undefined,
          req.body.newPassword
        )
        res.status(200).json(user)
        break
      default:
        res
          .status(400)
          .json({ message: `Unknown update type ${req.body.updateType}` })
    }
  }
}

export async function getUserByUUID(req: Request, res: Response) {
  const user = await User.findUserByUUID(req.params.uuid)

  if (!user) {
    res.status(404).json({ message: 'User not found' })
  } else {
    res.status(200).json(user)
  }
}

export async function getUserBySession(req: Request, res: Response) {
  if (!req.user) {
    res.status(404).json({ message: 'User not found' })
  } else {
    res.status(200).json(req.user)
  }
}
