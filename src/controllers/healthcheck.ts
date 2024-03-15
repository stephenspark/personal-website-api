import { Request, Response } from 'express'

export function healthcheck(req: Request, res: Response) {
  res.status(200).json({
    message: 'API is up.',
    current_datetime: new Date().toISOString(),
  })
}
