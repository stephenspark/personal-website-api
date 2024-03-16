import { Request, Response } from 'express'

import User from '../models/User'

export async function createUser(req: Request, res: Response) {
  if (await User.findUserByEmail(req.body.email)) {
    res
      .status(409)
      .json({ errors: 'A user with this email address already exists!' })
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
    res.status(500).json({ errors: 'Something went wrong!' })
  }
}

export async function updateUser(req: Request, res: Response) {
  let user = await User.findUserByUUID(req.params.uuid)

  if (!user) {
    res.status(404).send('User not found')
  } else {
    user = await User.updateUser(req.params.uuid, ...req.body)

    res.status(200).json(user)
  }
}

export async function getUserByUUID(req: Request, res: Response) {
  const user = await User.findUserByUUID(req.params.uuid)

  if (!user) {
    res.status(404).send('User not found')
  } else {
    res.status(200).json(user)
  }
}

export async function getUserBySession(req: Request, res: Response) {
  if (!req.user) {
    res.status(404).send('User not found')
  } else {
    res.status(200).json(req.user)
  }
}
