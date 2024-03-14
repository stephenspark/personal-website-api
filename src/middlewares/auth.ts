import { Request, Response, NextFunction } from 'express'

export function authenticationCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}
