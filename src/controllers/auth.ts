import { Request, Response, NextFunction } from 'express'
import { IUser } from 'models/User'
import passport from 'passport'

export function localLogin(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('local', (err: Error, user: IUser) => {
    if (err) {
      res.status(500).json({ message: 'Something went wrong.' })
    }

    if (!user) {
      res.status(400).json({ message: 'Email or password is invalid.' })
    } else {
      req.login(user, (err) => {
        if (err) {
          console.log(err)
          return
        }

        res.redirect('/')
      })
    }
  })(req, res, next)
}

export function logout(req: Request, res: Response, next: NextFunction) {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
  })
  res.redirect('/login')
}
