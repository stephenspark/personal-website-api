import { Request, Response, NextFunction } from 'express'
import { IUser } from '../models/User'
import passport from 'passport'

export function localLogin(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('local', (err: Error, user: IUser) => {
    if (err) {
      return res.status(500).json({ message: 'Something went wrong.' })
    }

    if (!user) {
      return res.status(400).json({ message: 'Email or password is invalid.' })
    }

    return req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Something went wrong' })
      }

      return res.status(200).json({ message: 'Login successful' })
    })
  })(req, res, next)
}

export function logout(req: Request, res: Response) {
  console.log(req.headers)
  console.log(req.session)
  return req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Something went wrong' })
    }

    return res.status(200).json({ message: 'Logout successful' })
  })
}
