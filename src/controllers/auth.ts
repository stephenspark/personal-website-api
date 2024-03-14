import { Request, Response, NextFunction } from 'express'
import passport from 'passport'

export function localLogin() {
  passport.authenticate('local', {
    failureRedirect: '/login?failed',
    failureMessage: true,
    successRedirect: '/',
  })
}

export function logout(req: Request, res: Response, next: NextFunction) {
  req.logout((err) => {
    if (err) {
      return next(err)
    }
  })
  res.redirect('/login')
}
